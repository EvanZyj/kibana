/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { HttpStart } from 'kibana/public';
import {
  TRUSTED_APPS_CREATE_API,
  TRUSTED_APPS_LIST_API,
} from '../../../../../common/endpoint/constants';
import {
  GetTrustedListAppsResponse,
  GetTrustedAppsListRequest,
  PostTrustedAppCreateRequest,
  PostTrustedAppCreateResponse,
} from '../../../../../common/endpoint/types/trusted_apps';

export interface TrustedAppsService {
  getTrustedAppsList(request: GetTrustedAppsListRequest): Promise<GetTrustedListAppsResponse>;
  createTrustedApp(request: PostTrustedAppCreateRequest): Promise<PostTrustedAppCreateResponse>;
}

export class TrustedAppsHttpService implements TrustedAppsService {
  constructor(private http: HttpStart) {}

  async getTrustedAppsList(request: GetTrustedAppsListRequest) {
    return this.http.get<GetTrustedListAppsResponse>(TRUSTED_APPS_LIST_API, {
      query: request,
    });
  }

  async createTrustedApp(request: PostTrustedAppCreateRequest) {
    return this.http.post<PostTrustedAppCreateResponse>(TRUSTED_APPS_CREATE_API, {
      body: JSON.stringify(request),
    });
  }
}
