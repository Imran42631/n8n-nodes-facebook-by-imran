import {
    IDataObject,
    IExecuteFunctions,
    IHttpRequestMethods,
    IHttpRequestOptions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

export class Facebook implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Facebook',
        name: 'facebook',
        icon: 'file:facebook-messenger-logo.png',
        group: ['transform'],
        version: 1,
        description: 'Send messages and manage interactions via Facebook Messenger',
        defaults: {
            name: 'Facebook',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'facebookPageApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Message',
                        value: 'message',
                    },
                    {
                        name: 'Image',
                        value: 'image',
                    },
                    {
                        name: 'Audio',
                        value: 'audio',
                    },
                    {
                        name: 'Video',
                        value: 'video',
                    },
                    {
                        name: 'User Profile',
                        value: 'userProfile',
                    },
                    {
                        name: 'Sender Action',
                        value: 'senderAction',
                    },
                    {
                        name: 'Comment',
                        value: 'comment',
                    },
                ],
                default: 'message',
            },
            // Message Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                    },
                },
                options: [
                    {
                        name: 'Send Message',
                        value: 'send',
                        description: 'Send a text message',
                        action: 'Send a text message',
                    },
                ],
                default: 'send',
            },
            // Image Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['image'],
                    },
                },
                options: [
                    {
                        name: 'Send Image',
                        value: 'send',
                        description: 'Send a single image',
                        action: 'Send an image',
                    },
                    {
                        name: 'Multi Image Sender (Upto 30 Images)',
                        value: 'sendMulti',
                        description: 'Send multiple images in one message',
                        action: 'Send multiple images',
                    },
                ],
                default: 'send',
            },
            // Audio Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['audio'],
                    },
                },
                options: [
                    {
                        name: 'Send Audio',
                        value: 'send',
                        description: 'Send an audio file',
                        action: 'Send an audio file',
                    },
                ],
                default: 'send',
            },
            // Video Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['video'],
                    },
                },
                options: [
                    {
                        name: 'Send Video',
                        value: 'send',
                        description: 'Send a video file',
                        action: 'Send a video file',
                    },
                ],
                default: 'send',
            },
            // User Profile Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['userProfile'],
                    },
                },
                options: [
                    {
                        name: 'Get User Profile Details',
                        value: 'get',
                        description: 'Get user profile details using PSID',
                        action: 'Get user profile details',
                    },
                ],
                default: 'get',
            },
            // Sender Action Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['senderAction'],
                    },
                },
                options: [
                    {
                        name: 'Mark Seen',
                        value: 'markSeen',
                        description: 'Mark a conversation as seen',
                        action: 'Mark seen',
                    },
                    {
                        name: 'Typing Effect On',
                        value: 'typingOn',
                        description: 'Turn on the typing indicator',
                        action: 'Typing effect on',
                    },
                    {
                        name: 'Typing Effect Off',
                        value: 'typingOff',
                        description: 'Turn off the typing indicator',
                        action: 'Typing effect off',
                    },
                ],
                default: 'markSeen',
            },
            // Comment Operations
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                    },
                },
                options: [
                    {
                        name: 'Reply to a Comment',
                        value: 'reply',
                        description: 'Reply to a specific comment',
                        action: 'Reply to a comment',
                    },
                    {
                        name: 'Send a Private Reply',
                        value: 'privateReply',
                        description: 'Send a private message in response to a comment',
                        action: 'Send a private reply',
                    },
                    {
                        name: 'Reply to a Comment with Image',
                        value: 'replyWithImage',
                        description: 'Reply to a specific comment with an image',
                        action: 'Reply to a comment with image',
                    },
                    {
                        name: 'Reply to a Comment with Sticker',
                        value: 'replyWithSticker',
                        description: 'Reply to a specific comment with a sticker',
                        action: 'Reply to a comment with sticker',
                    },
                    {
                        name: 'React to a Comment',
                        value: 'react',
                        description: 'Add a reaction to a specific comment (Requires Business Verification)',
                        action: 'React to a comment',
                    },
                    {
                        name: 'Like a Comment',
                        value: 'like',
                        description: 'Like a specific comment',
                        action: 'Like a comment',
                    },
                    {
                        name: 'Remove Like From a Comment',
                        value: 'unlike',
                        description: 'Remove a like from a specific comment',
                        action: 'Remove like from a comment',
                    },
                ],
                default: 'reply',
            },
            {
                displayName: 'Comment ID',
                name: 'commentId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['reply', 'privateReply', 'replyWithImage', 'replyWithSticker', 'react', 'like', 'unlike'],
                    },
                },
                default: '',
                description: 'The ID of the comment to react or reply to',
            },
            {
                displayName: 'Reaction Type',
                name: 'reactionType',
                type: 'options',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['react'],
                    },
                },
                options: [
                    { name: 'Like', value: 'LIKE' },
                    { name: 'Love', value: 'LOVE' },
                    { name: 'Care', value: 'CARE' },
                    { name: 'Haha', value: 'HAHA' },
                    { name: 'Wow', value: 'WOW' },
                    { name: 'Sad', value: 'SAD' },
                    { name: 'Angry', value: 'ANGRY' },
                ],
                default: 'LIKE',
                description: 'Choose the reaction type to add',
            },
            {
                displayName: '⚠️ **Note**: This operation requires **Business Verification** and the **pages_manage_engagement** permission to function.',
                name: 'notice',
                type: 'notice',
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['react'],
                    },
                },
                default: '',
            },
            {
                displayName: 'Message',
                name: 'replyMessage',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['reply', 'privateReply', 'replyWithImage'],
                    },
                },
                default: '',
                description: 'The message to post as a reply',
            },
            {
                displayName: 'Image URL',
                name: 'replyImageUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['replyWithImage'],
                    },
                },
                default: '',
                description: 'Public URL of the image to send as a reply',
            },
            {
                displayName: 'Sticker ID',
                name: 'replyStickerId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['comment'],
                        operation: ['replyWithSticker'],
                    },
                },
                default: '',
                description: 'The ID of the sticker to send as a reply',
            },
            {
                displayName: 'Recipient ID',
                name: 'recipientId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['send', 'sendMulti', 'markSeen', 'typingOn', 'typingOff', 'get'],
                    },
                },
                default: '',
                description: 'The ID of the recipient',
            },
            {
                displayName: 'PSID',
                name: 'psid',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['userProfile'],
                        operation: ['get'],
                    },
                },
                default: '',
                description: 'The Page Scoped ID (PSID) of the user',
            },
            {
                displayName: 'Fields',
                name: 'fields',
                type: 'multiOptions',
                displayOptions: {
                    show: {
                        resource: ['userProfile'],
                        operation: ['get'],
                    },
                },
                options: [
                    { name: 'First Name', value: 'first_name' },
                    { name: 'Last Name', value: 'last_name' },
                    { name: 'Profile Picture', value: 'profile_pic' },
                    { name: 'Locale', value: 'locale' },
                    { name: 'Timezone', value: 'timezone' },
                    { name: 'Gender', value: 'gender' },
                ],
                default: ['first_name', 'last_name', 'profile_pic'],
                description: 'The profile fields to retrieve',
            },
            // Message Resource
            {
                displayName: 'Text',
                name: 'text',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['message'],
                        operation: ['send'],
                    },
                },
                default: '',
                description: 'The text message to send',
            },
            // Multi Image Sender Params
            {
                displayName: 'Comma Separated Image URLs',
                name: 'multiImageUrlsString',
                type: 'string',
                displayOptions: {
                    show: {
                        resource: ['image'],
                        operation: ['sendMulti'],
                    },
                },
                default: '',
                placeholder: 'https://url1.com, https://url2.com',
                description: 'Add multiple image URLs separated by commas',
            },
            {
                displayName: 'Additional Image URLs',
                name: 'multiImageUrlsList',
                type: 'fixedCollection',
                typeOptions: {
                    multipleValues: true,
                },
                displayOptions: {
                    show: {
                        resource: ['image'],
                        operation: ['sendMulti'],
                    },
                },
                placeholder: 'Add Image URL',
                default: {},
                options: [
                    {
                        name: 'urls',
                        displayName: 'URLs',
                        values: [
                            {
                                displayName: 'Image URL',
                                name: 'url',
                                type: 'string',
                                default: '',
                            },
                        ],
                    },
                ],
            },
            // Send Method for Assets (Image, Audio, Video)
            {
                displayName: 'Send Method',
                name: 'sendMethod',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: ['image', 'audio', 'video'],
                        operation: ['send'],
                    },
                },
                default: 'url',
                options: [
                    {
                        name: 'URL',
                        value: 'url',
                        description: 'Input a public URL for the file',
                    },
                    {
                        name: 'N8n Binary Data',
                        value: 'binary',
                        description: 'Use a file from a previous node',
                    },
                    {
                        name: 'Attachment ID',
                        value: 'attachmentId',
                        description: 'Use a pre-uploaded attachment ID',
                    },
                ],
            },
            {
                displayName: 'Image URL',
                name: 'imageUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['image'],
                        operation: ['send'],
                        sendMethod: ['url'],
                    },
                },
                default: '',
                description: 'Public URL of the image to send',
            },
            {
                displayName: 'Audio URL',
                name: 'audioUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['audio'],
                        operation: ['send'],
                        sendMethod: ['url'],
                    },
                },
                default: '',
                description: 'Public URL of the audio to send',
            },
            {
                displayName: 'Video URL',
                name: 'videoUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['video'],
                        operation: ['send'],
                        sendMethod: ['url'],
                    },
                },
                default: '',
                description: 'Public URL of the video to send',
            },
            {
                displayName: 'Binary Property',
                name: 'binaryPropertyName',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['image', 'audio', 'video'],
                        operation: ['send'],
                        sendMethod: ['binary'],
                    },
                },
                default: 'data',
                description: 'Name of the binary property which contains the file',
            },
            {
                displayName: 'Attachment ID',
                name: 'attachmentId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: ['image', 'audio', 'video'],
                        operation: ['send'],
                        sendMethod: ['attachmentId'],
                    },
                },
                default: '',
                description: 'The ID of the pre-uploaded attachment',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        const credentials = await this.getCredentials('facebookPageApi');
        const accessToken = credentials.accessToken as string;

        for (let i = 0; i < items.length; i++) {
            try {
                const resource = this.getNodeParameter('resource', i) as string;
                const operation = this.getNodeParameter('operation', i) as string;

                if (resource === 'message') {
                    if (operation === 'send') {
                        const recipientId = this.getNodeParameter('recipientId', i) as string;
                        const text = this.getNodeParameter('text', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/me/messages`,
                            qs: { access_token: accessToken },
                            body: {
                                recipient: { id: recipientId },
                                message: { text },
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    }
                } else if (resource === 'image' && operation === 'sendMulti') {
                    const recipientId = this.getNodeParameter('recipientId', i) as string;
                    const multiImageUrlsString = this.getNodeParameter('multiImageUrlsString', i) as string;
                    const multiImageUrlsList = this.getNodeParameter('multiImageUrlsList', i) as any;

                    const urls: string[] = [];

                    // 1. Get from comma separated string
                    if (multiImageUrlsString) {
                        const splitUrls = multiImageUrlsString.split(',').map((url) => url.trim()).filter((url) => url !== '');
                        urls.push(...splitUrls);
                    }

                    // 2. Get from list fields
                    if (multiImageUrlsList?.urls) {
                        for (const urlData of multiImageUrlsList.urls) {
                            if (urlData.url && urlData.url.trim() !== '') {
                                urls.push(urlData.url.trim());
                            }
                        }
                    }

                    // Build attachments array (capped at 30)
                    const attachments = urls.slice(0, 30).map((url) => ({
                        type: 'image',
                        payload: {
                            url,
                        },
                    }));

                    if (attachments.length === 0) {
                        throw new Error('Please provide at least one valid image URL');
                    }

                    const options: any = {
                        method: 'POST' as IHttpRequestMethods,
                        url: `https://graph.facebook.com/v21.0/me/messages`,
                        qs: { access_token: accessToken },
                        body: {
                            recipient: { id: recipientId },
                            message: {
                                attachments,
                            },
                        },
                        json: true,
                    };

                    const responseData = await this.helpers.httpRequest(options);
                    returnData.push({ json: responseData });
                } else if (resource === 'image' || resource === 'audio' || resource === 'video') {
                    if (operation === 'send') {
                        const recipientId = this.getNodeParameter('recipientId', i) as string;
                        const sendMethod = this.getNodeParameter('sendMethod', i) as string;
                        const type = resource;
                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/me/messages`,
                            qs: { access_token: accessToken },
                        };

                        if (sendMethod === 'url') {
                            let fileUrl = '';
                            if (resource === 'image') fileUrl = this.getNodeParameter('imageUrl', i) as string;
                            else if (resource === 'audio') fileUrl = this.getNodeParameter('audioUrl', i) as string;
                            else if (resource === 'video') fileUrl = this.getNodeParameter('videoUrl', i) as string;

                            options.body = {
                                recipient: { id: recipientId },
                                message: {
                                    attachment: {
                                        type,
                                        payload: {
                                            url: fileUrl,
                                            is_reusable: true,
                                        },
                                    },
                                },
                            };
                            options.json = true;
                        } else if (sendMethod === 'attachmentId') {
                            const attachmentId = this.getNodeParameter('attachmentId', i) as string;
                            options.body = {
                                recipient: { id: recipientId },
                                message: {
                                    attachment: {
                                        type,
                                        payload: {
                                            attachment_id: attachmentId,
                                        },
                                    },
                                },
                            };
                            options.json = true;
                        } else if (sendMethod === 'binary') {
                            const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
                            const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
                            const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

                            let filename = binaryData.fileName || 'file';
                            if (!binaryData.fileName) {
                                if (type === 'image') filename = 'image.png';
                                else if (type === 'audio') filename = 'audio.mp3';
                                else if (type === 'video') filename = 'video.mp4';
                            }

                            options.formData = {
                                recipient: JSON.stringify({ id: recipientId }),
                                message: JSON.stringify({
                                    attachment: {
                                        type,
                                        payload: { is_reusable: true },
                                    },
                                }),
                                filedata: {
                                    value: buffer,
                                    options: {
                                        filename,
                                        contentType: binaryData.mimeType,
                                    },
                                },
                            };
                        }

                        const responseData = await this.helpers.httpRequest(options);

                        if (typeof responseData === 'string') {
                            try {
                                returnData.push({ json: JSON.parse(responseData) });
                            } catch (e) {
                                returnData.push({ json: { response: responseData } });
                            }
                        } else {
                            returnData.push({ json: responseData });
                        }
                    }
                } else if (resource === 'userProfile') {
                    if (operation === 'get') {
                        const psid = this.getNodeParameter('psid', i) as string;
                        const fields = this.getNodeParameter('fields', i) as string[];

                        const options: any = {
                            method: 'GET' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${psid}`,
                            qs: {
                                fields: fields.join(','),
                                access_token: accessToken,
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    }
                } else if (resource === 'senderAction') {
                    const recipientId = this.getNodeParameter('recipientId', i) as string;
                    let action = '';
                    if (operation === 'markSeen') action = 'mark_seen';
                    else if (operation === 'typingOn') action = 'typing_on';
                    else if (operation === 'typingOff') action = 'typing_off';

                    const options: any = {
                        method: 'POST' as IHttpRequestMethods,
                        url: `https://graph.facebook.com/v21.0/me/messages`,
                        qs: { access_token: accessToken },
                        body: {
                            recipient: { id: recipientId },
                            sender_action: action,
                        },
                        json: true,
                    };

                    const responseData = await this.helpers.httpRequest(options);
                    returnData.push({ json: responseData });
                } else if (resource === 'comment') {
                    if (operation === 'reply') {
                        const commentId = this.getNodeParameter('commentId', i) as string;
                        const message = this.getNodeParameter('replyMessage', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${commentId}/comments`,
                            qs: { access_token: accessToken },
                            body: {
                                message,
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    } else if (operation === 'privateReply') {
                        const commentId = this.getNodeParameter('commentId', i) as string;
                        const message = this.getNodeParameter('replyMessage', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/me/messages`,
                            qs: { access_token: accessToken },
                            body: {
                                recipient: { comment_id: commentId },
                                message: { text: message },
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    } else if (operation === 'replyWithImage') {
                        const commentId = this.getNodeParameter('commentId', i) as string;
                        const message = this.getNodeParameter('replyMessage', i) as string;
                        const attachmentUrl = this.getNodeParameter('replyImageUrl', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${commentId}/comments`,
                            qs: { access_token: accessToken },
                            body: {
                                message,
                                attachment_url: attachmentUrl,
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    } else if (operation === 'replyWithSticker') {
                        const commentId = this.getNodeParameter('commentId', i) as string;
                        const stickerId = this.getNodeParameter('replyStickerId', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${commentId}/comments`,
                            qs: { access_token: accessToken },
                            body: {
                                sticker_id: stickerId,
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    } else if (operation === 'react') {
                        const commentId = this.getNodeParameter('commentId', i) as string;
                        const type = this.getNodeParameter('reactionType', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${commentId}/reactions`,
                            qs: { access_token: accessToken },
                            body: {
                                type,
                            },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    } else if (operation === 'like') {
                        const commentId = this.getNodeParameter('commentId', i) as string;

                        const options: any = {
                            method: 'POST' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${commentId}/likes`,
                            qs: { access_token: accessToken },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    } else if (operation === 'unlike') {
                        const commentId = this.getNodeParameter('commentId', i) as string;

                        const options: any = {
                            method: 'DELETE' as IHttpRequestMethods,
                            url: `https://graph.facebook.com/v21.0/${commentId}/likes`,
                            qs: { access_token: accessToken },
                            json: true,
                        };

                        const responseData = await this.helpers.httpRequest(options);
                        returnData.push({ json: responseData });
                    }
                }
            } catch (error) {
                const errorResponse = (error as any).response;
                const errorData = errorResponse?.data || errorResponse?.body;
                let descriptiveError = (error as Error).message;

                if (errorData) {
                    try {
                        const body = typeof errorData === 'string' ? JSON.parse(errorData) : errorData;
                        if (body.error && body.error.message) {
                            descriptiveError = `Facebook Error: ${body.error.message}`;
                        }
                    } catch (e) { }
                }

                if (this.continueOnFail()) {
                    returnData.push({ json: { error: descriptiveError, raw: errorData } });
                    continue;
                }
                throw new Error(descriptiveError);
            }
        }

        return [returnData];
    }
}
