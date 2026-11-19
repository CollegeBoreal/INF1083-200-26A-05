// Phrases utiles par langue : texte local, prononciation et écriture d'origine
export interface Phrase {
  fr: string
  local: string
  native?: string
}

export interface PhraseBook {
  name: string
  items: Phrase[]
}

const fr = (local: string[]): Phrase[] =>
  ['Bonjour', 'Merci', 'Combien ça coûte ?', 'Au revoir'].map((label, i) => ({ fr: label, local: local[i] }))

const withNative = (local: string[], native: string[]): Phrase[] =>
  fr(local).map((p, i) => ({ ...p, native: native[i] }))

export const PHRASES: { [lang: string]: PhraseBook } = {
  qc: { name: 'Français québécois', items: fr(['Allô !', 'Merci ben !', 'Ça coûte combien ?', 'Bonne journée !']) },
  fr: { name: 'Français', items: fr(['Bonjour', 'Merci', "C'est combien ?", 'Au revoir']) },
  en: { name: 'Anglais', items: fr(['Hello', 'Thank you', 'How much is it?', 'Goodbye']) },
  es: { name: 'Espagnol', items: fr(['Hola', 'Gracias', '¿Cuánto cuesta?', 'Adiós']) },
  pt: { name: 'Portugais', items: fr(['Olá', 'Obrigado', 'Quanto custa?', 'Tchau']) },
  it: { name: 'Italien', items: fr(['Buongiorno', 'Grazie', 'Quanto costa?', 'Arrivederci']) },
  de: { name: 'Allemand', items: fr(['Guten Tag', 'Danke', 'Wie viel kostet das?', 'Auf Wiedersehen']) },
  nl: { name: 'Néerlandais', items: fr(['Hallo', 'Dank je', 'Hoeveel kost het?', 'Tot ziens']) },
  sv: { name: 'Suédois', items: fr(['Hej', 'Tack', 'Hur mycket kostar det?', 'Hej då']) },
  cs: { name: 'Tchèque', items: fr(['Dobrý den', 'Děkuji', 'Kolik to stojí?', 'Na shledanou']) },
  tr: { name: 'Turc', items: fr(['Merhaba', 'Teşekkürler', 'Ne kadar?', 'Hoşça kal']) },
  sw: { name: 'Swahili', items: fr(['Jambo', 'Asante', 'Bei gani?', 'Kwaheri']) },
  vi: { name: 'Vietnamien', items: fr(['Xin chào', 'Cảm ơn', 'Bao nhiêu tiền?', 'Tạm biệt']) },
  el: { name: 'Grec', items: withNative(['Yassou', 'Efcharistó', 'Póso kánei?', 'Antío'], ['Γειά σου', 'Ευχαριστώ', 'Πόσο κάνει;', 'Αντίο']) },
  ar: { name: 'Arabe', items: withNative(['Salam alaykoum', 'Choukran', 'Bikam ?', "Ma'a salama"], ['السلام عليكم', 'شكرا', 'بكم؟', 'مع السلامة']) },
  ja: { name: 'Japonais', items: withNative(['Konnichiwa', 'Arigatō', 'Ikura desu ka?', 'Sayōnara'], ['こんにちは', 'ありがとう', 'いくらですか？', 'さようなら']) },
  zh: { name: 'Mandarin', items: withNative(['Nǐ hǎo', 'Xièxie', 'Duōshao qián?', 'Zàijiàn'], ['你好', '谢谢', '多少钱？', '再见']) },
  ko: { name: 'Coréen', items: withNative(['Annyeonghaseyo', 'Gamsahamnida', 'Eolmayeyo?', 'Annyeonghi gyeseyo'], ['안녕하세요', '감사합니다', '얼마예요?', '안녕히 계세요']) },
  th: { name: 'Thaï', items: withNative(['Sawatdee', 'Khob khun', 'Tao rai?', 'La gon'], ['สวัสดี', 'ขอบคุณ', 'เท่าไหร่', 'ลาก่อน']) },
  hi: { name: 'Hindi', items: withNative(['Namaste', 'Dhanyavaad', 'Kitne ka hai?', 'Phir milenge'], ['नमस्ते', 'धन्यवाद', 'कितने का है?', 'फिर मिलेंगे']) },
}
