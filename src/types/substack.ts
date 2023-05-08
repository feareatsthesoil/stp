export interface Post {
    id: number;
    publication_id: number;
    title: string;
    social_title: null;
    search_engine_title: null;
    search_engine_description: null;
    type: string;
    slug: string;
    post_date: string;
    audience: string;
    podcast_duration: null;
    video_upload_id: null;
    podcast_upload_id: null;
    write_comment_permissions: string;
    should_send_free_preview: boolean;
    free_unlock_required: boolean;
    default_comment_sort: null;
    canonical_url: string;
    section_id: null;
    top_exclusions: any[];
    pins: any[];
    is_section_pinned: boolean;
    section_slug: null;
    section_name: null;
    reactions: Reactions;
    subtitle: string;
    cover_image: string;
    cover_image_is_square: boolean;
    podcast_url: string;
    videoUpload: null;
    podcast_preview_upload_id: null;
    podcastUpload: null;
    podcastPreviewUpload: null;
    voiceover_upload_id: null;
    voiceoverUpload: null;
    has_voiceover: boolean;
    description: string;
    body_json: null;
    body_html: null;
    longer_truncated_body_json: null;
    longer_truncated_body_html: null;
    truncated_body_text: string;
    wordcount: number;
    postTags: any[];
    publishedBylines: PublishedByline[];
    reaction_count: number;
    reaction: null;
    comment_count: number;
    child_comment_count: number;
    audio_items: AudioItem[];
    hasCashtag: boolean;
}

export interface AudioItem {
    post_id: number;
    voice_id: string;
    audio_url: string;
    type: string;
    status: string;
}

export interface PublishedByline {
    id: number;
    name: string;
    handle: null;
    previous_name: string;
    photo_url: string;
    bio: string;
    profile_set_up_at: Date;
    publicationUsers: PublicationUser[];
    twitter_screen_name: string;
    is_guest: boolean;
    bestseller_tier: null;
}

export interface PublicationUser {
    id: number;
    user_id: number;
    publication_id: number;
    role: string;
    public: boolean;
    is_primary: boolean;
    publication: Publication;
}

export interface Publication {
    id: number;
    name: string;
    subdomain: string;
    custom_domain: string;
    custom_domain_optional: boolean;
    hero_text: string;
    logo_url: string;
    author_id: number;
    theme_var_background_pop: string;
    created_at: Date;
    rss_website_url: null;
    email_from_name: string;
    copyright: string;
    founding_plan_name: null;
    community_enabled: boolean;
    invite_only: boolean;
    payments_state: string;
}

export interface Reactions {
    "❤": number;
}
