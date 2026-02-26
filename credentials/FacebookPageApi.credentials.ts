import {
    ICredentialType,
    ICredentialTestRequest,
    INodeProperties,
} from 'n8n-workflow';

export class FacebookPageApi implements ICredentialType {
    name = 'facebookPageApi';
    displayName = 'Facebook Page API';
    documentationUrl = 'https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup';
    properties: INodeProperties[] = [
        {
            displayName: 'Page Access Token',
            name: 'accessToken',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'The Page Access Token for your Facebook Page',
        },
        {
            displayName: 'Page ID',
            name: 'pageId',
            type: 'string',
            default: '',
            required: false,
            description: 'The ID of your Facebook Page (Optional)',
        },
    ];

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://graph.facebook.com/v21.0',
            url: '/me',
            qs: {
                access_token: '={{$credentials.accessToken}}',
            },
        },
    };
}
