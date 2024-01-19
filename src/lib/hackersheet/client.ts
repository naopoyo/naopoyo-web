import {
  createClient as _createUrqlClient,
  cacheExchange,
  fetchExchange,
  type Client as UrqlClient,
} from '@urql/core'

import { GetDocumentArgs, createGetDocumentResponse } from './get-document'
import { GetDocumentsArgs, createDocumentListResponse } from './get-documents'
import { createGetTagResponse, GetTagArgs } from './get-tag'
import { createGetTagsResponse, GetTagsArgs } from './get-tags'
import { createGetWebsitesResponse } from './get-websites'
import {
  DocumentDocument,
  DocumentsDocument,
  TagDocument,
  TagsDocument,
  WebsitesDocument,
} from './gql/graphql'

export interface ClientOptions {
  url: string
  accessKey: string
  urqlClient?: UrqlClient
}

export class Client {
  url: string
  accessKey: string
  urqlClient: UrqlClient

  constructor(options: ClientOptions) {
    this.url = options.url
    this.accessKey = options.accessKey
    this.urqlClient = options.urqlClient ?? this.createUrqlClient()
  }

  async getDocument(args: GetDocumentArgs) {
    const result = await this.urqlClient.query(DocumentDocument, args)
    return createGetDocumentResponse(result)
  }

  async getDocuments(args?: GetDocumentsArgs) {
    const result = await this.urqlClient.query(DocumentsDocument, args ?? {})
    return createDocumentListResponse(result)
  }

  async getTag(args: GetTagArgs) {
    const result = await this.urqlClient.query(TagDocument, args)
    return createGetTagResponse(result)
  }

  async getTags(args?: GetTagsArgs) {
    const result = await this.urqlClient.query(TagsDocument, args ?? {})
    return createGetTagsResponse(result)
  }

  async getWebsites() {
    const result = await this.urqlClient.query(WebsitesDocument, {})
    return createGetWebsitesResponse(result)
  }

  private createUrqlClient(): UrqlClient {
    return _createUrqlClient({
      url: this.url,
      exchanges: [cacheExchange, fetchExchange],
      fetchOptions: {
        headers: {
          Authorization: `bearer ${this.accessKey}`,
        },
        next: {
          revalidate: 60,
        },
      },
    })
  }
}
