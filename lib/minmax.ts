import { AnalyzeResult, Classification } from '@/types';

const SCAM_PROMPT = `Analyze this message for scam/fraud. 

OUTPUT FORMAT (exactly this JSON, no other text):
{"score": 0-100, "classification": "safe|suspicious|scam", "analysis": "one sentence"}

Scoring rules:
- Score 0-30: SAFE - normal message
- Score 31-60: SUSPICIOUS - questionable but not clearly fraud
- Score 61-100: SCAM - clear fraud indicators

Scam indicators: money requests, urgency, threats, prizes, impersonation, suspicious links, password/OTP requests.

Message to analyze:`;

export async function analyzeText(text: string): Promise<AnalyzeResult> {
  const minMaxApiKey = process.env.MINMAX_API_KEY;
  
  if (!minMaxApiKey) {
    return {
      score: 0,
      classification: 'safe',
      analysis: 'API key not configured'
    };
  }

  try {
    const response = await fetch(
      'https://api.minimax.io/v1/text/chatcompletion_v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${minMaxApiKey}`,
        },
        body: JSON.stringify({
          model: 'M2-her',
          messages: [
            {
              role: 'user',
              content: SCAM_PROMPT + ' "' + text + '"'
            }
          ],
          temperature: 0.0,
          top_p: 0.1,
          max_completion_tokens: 100,
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MinMax API error:', response.status, errorText);
      return {
        score: 0,
        classification: 'safe',
        analysis: `API error: ${response.status}`
      };
    }

    const data = await response.json();
    console.log('MinMax response:', JSON.stringify(data, null, 2));
    
    const responseText = data.choices?.[0]?.message?.content || '';
    console.log('Response text:', responseText);

    let result: AnalyzeResult;
    
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0]);
    } else {
      return {
        score: 0,
        classification: 'safe',
        analysis: 'AI did not return JSON: ' + responseText.substring(0, 50)
      };
    }
    
    console.log('Parsed result:', result);
    
    if (!isValidClassification(result.classification)) {
      result.classification = calculateClassification(result.score);
    }
    
    return result;
  } catch (error) {
    console.error('MinMax analysis error:', error);
    return {
      score: 0,
      classification: 'safe',
      analysis: 'Analysis failed'
    };
  }
}

function isValidClassification(value: string): value is Classification {
  return ['safe', 'suspicious', 'scam'].includes(value);
}

function calculateClassification(score: number): Classification {
  if (score <= 30) return 'safe';
  if (score <= 60) return 'suspicious';
  return 'scam';
}
