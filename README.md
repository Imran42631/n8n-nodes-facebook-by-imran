# n8n-nodes-facebook-by-imran

🚀 **Professional Facebook & Messenger Node for n8n**

Take your Facebook automation to the next level with this high-performance, professional-grade node. This is not just a simple messenger node; it is a complete toolkit for **Page Management**, **Content Posting**, and **Advanced Moderation**.

---

## ✨ Features

### 🛡️ Advanced Comment Moderation
Manage your page interactions like a pro. Protect your community and automate engagement.
- **Delete a Comment**: Automatically remove unwanted or spam comments.
- **Hide/Unhide Comments**: Control visibility without deleting (excellent for moderation).
- **React & Like**: Add standard reactions (Like, Love, Wow, etc.) or a simple Like to any comment.
- **Private Reply**: Automatically send a Messenger DM in response to a public comment.

### 📝 Page Feed & Content Posting
Post directly to your Facebook Page timeline using professional endpoints.
- **Status Updates**: Post standard text messages.
- **Link Sharing**: Post messages with clickable preview links.
- **Photo Uploads**: Post high-quality images with captions directly to your feed.

### 🔘 Interactive Messaging (Quick Replies)
Build conversational experiences with ease.
- **Send Question with Buttons**: Ask your users questions and provide up to **13 quick reply buttons**.
- **Custom Payloads**: Each button can send a specific payload back to your n8n trigger for logical branching.
- **Button Icons**: Support for optional image URLs on each button.

### 🖼️ High-End Media Support
- **Multi-Image Gallery**: Send up to **30 images** in a single message! Perfect for product catalogs.
- **Universal Media Sender**: Send **Images**, **Audio**, and **Video** via public URL or n8n Binary Data.
- **Attachment IDs**: Reuse previously uploaded assets for faster response times.

### 👤 Intelligence & Flow
- **User Profile Retrieval**: Get PSID-scoped details like Name, Profile Picture, Locale, and Timezone.
- **Sender Actions**: Real-time control over "Mark Seen", "Typing On", and "Typing Off" indicators.

---

## 🛠️ Technical Specifications
- **API Version**: Powered by **Facebook Graph API v21.0**.
- **Architecture**: Standard n8n community node structure for maximum reliability.
- **Security**: Hardened against injection and optimized for secure credential handling.

---

## 🚀 Installation

1. Open your n8n instance.
2. Go to **Settings > Community Nodes**.
3. Click **Install a node**.
4. Enter `n8n-nodes-facebook-by-imran`.
5. Click **Install**.

---

## 🔑 Permissions Needed
Ensure your Facebook Page Access Token has the following scopes:
- `pages_messaging`
- `pages_manage_engagement` (Required for Comments & Page Feed)
- `pages_read_engagement`
- `pages_show_list`
- `pages_manage_posts` (Required for Feed posting)

---

## 🤝 Support & Author
Created with ❤️ by **Imran**. 

If you find this node useful, please consider connecting with me or sharing it with the community!

🔗 **Connect with me**: [Facebook Profile](https://www.facebook.com/imran42631)
📧 **Email**: imran42633@gmail.com

---
*Note: Some operations like Reactions require Business Verification on your Facebook App.*
