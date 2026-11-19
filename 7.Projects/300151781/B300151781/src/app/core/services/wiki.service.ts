import { Injectable } from '@angular/core'
import { Http, ImageSource } from '@nativescript/core'
import { City } from '../models/city'

export interface WikiInfo {
  image: string | null
  history: string
}

// Wikipédia demande d'identifier l'application qui fait les requêtes
const HEADERS = {
  'Api-User-Agent': 'Lounivers/2.0 (projet etudiant INF1083)',
  'User-Agent': 'Lounivers/2.0 (projet etudiant INF1083; Android)',
}

@Injectable({ providedIn: 'root' })
export class WikiService {
  private cache = new Map<number, WikiInfo>()

  // Photo principale + section « Histoire » de l'article Wikipédia de la ville
  async get(city: City): Promise<WikiInfo> {
    if (this.cache.has(city.id)) {
      return this.cache.get(city.id)
    }
    const title = encodeURIComponent((city.wiki || city.name).replace(/ /g, '_'))
    const [summary, page] = await Promise.all([
      this.json(`https://fr.wikipedia.org/api/rest_v1/page/summary/${title}`),
      this.json(
        `https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&exsectionformat=wiki&redirects=1&format=json&formatversion=2&titles=${title}`,
      ),
    ])
    const original = summary?.originalimage
    const thumb: string = summary?.thumbnail?.source
    const image = original && original.width <= 1600 ? original.source : thumb ? thumb.replace(/\/\d+px-/, '/800px-') : null
    const extract: string = page?.query?.pages?.[0]?.extract || ''
    const info: WikiInfo = { image, history: this.history(extract) || summary?.extract || '' }
    if (info.image || info.history) {
      this.cache.set(city.id, info)
    }
    return info
  }

  async photo(url: string): Promise<ImageSource | null> {
    try {
      return await Http.getImage({ url, method: 'GET', headers: HEADERS, timeout: 20000 })
    } catch {
      return null
    }
  }

  private async json(url: string): Promise<any> {
    try {
      const response = await Http.request({ url, method: 'GET', headers: HEADERS, timeout: 15000 })
      return response.statusCode === 200 ? response.content.toJSON() : null
    } catch {
      return null
    }
  }

  // Garde la section « == Histoire == » (sans les sous-titres), limitée à ~1200 caractères
  private history(text: string): string {
    const match = text.match(/\n== ?Histoire ?==\n([\s\S]*?)(?=\n== [^=]|$)/)
    if (!match) {
      return ''
    }
    let story = match[1]
      .replace(/\n=+[^=\n]*=+\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim()
    if (story.length > 1200) {
      const cut = story.lastIndexOf('. ', 1200)
      story = story.slice(0, cut > 400 ? cut + 1 : 1200) + ' …'
    }
    return story
  }
}
