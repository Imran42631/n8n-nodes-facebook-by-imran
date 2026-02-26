import {
    IDataObject,
    INodeType,
    INodeTypeDescription,
    IWebhookFunctions,
    IWebhookResponseData,
    NodeConnectionType,
} from 'n8n-workflow';

export class FacebookTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Facebook Trigger',
        name: 'facebookTrigger',
        icon: 'file:facebook-messenger-logo.png',
        group: ['trigger'],
        version: 1,
        description: 'Facebook Page & Messenger toolkit: Real-time event triggers, AI-ready moderation, interactive messaging, and high-scale media distribution.\n\n Made With 💖 By Imran Hossain',
        defaults: {
            name: 'Facebook Trigger',
        },
        triggerPanel: true,
        eventTriggerDescription: 'The Facebook Webhook URL to use in your Facebook App settings.',
        inputs: [],
        outputs: [
            {
                displayName: 'Webhook',
                type: 'main' as NodeConnectionType,
            },
        ],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'GET',
                responseMode: 'onReceived',
                path: '={{ $parameter["path"] }}',
                isFullPath: true,
            },
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: '={{ $parameter["path"] }}',
                isFullPath: true,
            },
        ],
        properties: [
            {
                displayName: 'Webhook Path',
                name: 'path',
                type: 'string',
                default: '={{ $webhookId }}',
                required: true,
                description: 'The path to listen for webhook requests',
            },
            {
                displayName: 'Verify Token',
                name: 'verifyToken',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: false,
                description: 'The verify token set in Facebook app settings (optional)',
            },
        ],
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const req = this.getRequestObject();
        const res = this.getResponseObject();

        const query = req.query as IDataObject;
        const headers = req.headers as IDataObject;
        const body = req.body as IDataObject;

        // GET request - Facebook webhook verification
        if (req.method === 'GET') {
            const mode = query['hub.mode'] as string;
            const token = query['hub.verify_token'] as string;
            const challenge = query['hub.challenge'] as string;
            const verifyToken = this.getNodeParameter('verifyToken', '') as string;

            if (mode === 'subscribe' && token === verifyToken) {
                res.status(200).send(challenge);
                return {
                    workflowData: [
                        this.helpers.returnJsonArray([{
                            headers,
                            query,
                            body,
                            verified: true,
                        }]),
                    ],
                };
            } else {
                res.status(403).send('Verification failed');
                return {
                    workflowData: [
                        this.helpers.returnJsonArray([{
                            headers,
                            query,
                            body,
                            verified: false,
                        }]),
                    ],
                };
            }
        }

        // POST request - Receive webhook events
        if (req.method === 'POST') {
            res.status(200).send('EVENT_RECEIVED');

            return {
                workflowData: [
                    this.helpers.returnJsonArray([{
                        headers,
                        query,
                        body,
                    }]),
                ],
            };
        }

        return {
            workflowData: [],
        };
    }
}
