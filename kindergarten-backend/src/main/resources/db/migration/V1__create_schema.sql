-- Hero Slides
CREATE TABLE hero_slides (
    id VARCHAR(50) PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(300),
    heading VARCHAR(300),
    subheading VARCHAR(500),
    cta_label VARCHAR(100),
    cta_link VARCHAR(300),
    cta_fragment VARCHAR(200),
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Staff Members
CREATE TABLE staff_members (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    role VARCHAR(200),
    department VARCHAR(50) NOT NULL,
    photo VARCHAR(500),
    bio TEXT,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    group_role VARCHAR(30),
    class_info VARCHAR(200),
    experience INT NOT NULL DEFAULT 0,
    email VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE staff_qualifications (
    staff_id VARCHAR(50) NOT NULL REFERENCES staff_members(id) ON DELETE CASCADE,
    qualification VARCHAR(300) NOT NULL
);

CREATE TABLE staff_specialties (
    staff_id VARCHAR(50) NOT NULL REFERENCES staff_members(id) ON DELETE CASCADE,
    specialty VARCHAR(300) NOT NULL
);

-- News Articles
CREATE TABLE news_articles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    cover_image VARCHAR(500),
    published_at TIMESTAMP,
    category VARCHAR(50) NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_news_slug ON news_articles(slug);
CREATE INDEX idx_news_category ON news_articles(category);
CREATE INDEX idx_news_featured ON news_articles(featured);

CREATE TABLE news_tags (
    article_id VARCHAR(50) NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL
);

-- Educational Programs
CREATE TABLE educational_programs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(300) NOT NULL UNIQUE,
    short_description TEXT,
    full_description TEXT,
    cover_image VARCHAR(500),
    icon_emoji VARCHAR(20),
    age_group VARCHAR(20) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    long_description TEXT,
    weekly_schedule VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_programs_slug ON educational_programs(slug);
CREATE INDEX idx_programs_age_group ON educational_programs(age_group);

CREATE TABLE program_outcomes (
    program_id VARCHAR(50) NOT NULL REFERENCES educational_programs(id) ON DELETE CASCADE,
    outcome VARCHAR(500) NOT NULL
);

CREATE TABLE program_featured_images (
    program_id VARCHAR(50) NOT NULL REFERENCES educational_programs(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL
);

-- Gallery Albums
CREATE TABLE gallery_albums (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    cover_image VARCHAR(500),
    age_group VARCHAR(20),
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_albums_age_group ON gallery_albums(age_group);
CREATE INDEX idx_albums_category ON gallery_albums(category);

CREATE TABLE gallery_images (
    id VARCHAR(100) PRIMARY KEY,
    album_id VARCHAR(50) NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
    src VARCHAR(500) NOT NULL,
    alt VARCHAR(300),
    caption VARCHAR(500),
    width INT NOT NULL DEFAULT 800,
    height INT NOT NULL DEFAULT 600
);

-- Program <-> Album join table
CREATE TABLE program_albums (
    program_id VARCHAR(50) NOT NULL REFERENCES educational_programs(id) ON DELETE CASCADE,
    album_id VARCHAR(50) NOT NULL REFERENCES gallery_albums(id) ON DELETE CASCADE,
    PRIMARY KEY (program_id, album_id)
);

-- Learning Materials
CREATE TABLE learning_materials (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    type VARCHAR(20) NOT NULL,
    icon VARCHAR(20),
    category VARCHAR(50) NOT NULL,
    description TEXT,
    file_url VARCHAR(500),
    size VARCHAR(50),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    age_group VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_materials_category ON learning_materials(category);
CREATE INDEX idx_materials_age_group ON learning_materials(age_group);

-- Facilities
CREATE TABLE facilities (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    description TEXT,
    icon_emoji VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE facility_images (
    id VARCHAR(100) PRIMARY KEY,
    facility_id VARCHAR(50) NOT NULL REFERENCES facilities(id) ON DELETE CASCADE,
    src VARCHAR(500) NOT NULL,
    alt VARCHAR(300),
    caption VARCHAR(500),
    width INT NOT NULL DEFAULT 800,
    height INT NOT NULL DEFAULT 600
);

-- Contact Info
CREATE TABLE contact_info (
    id VARCHAR(50) PRIMARY KEY,
    school_name VARCHAR(300) NOT NULL,
    address VARCHAR(500),
    district VARCHAR(200),
    city VARCHAR(200),
    email VARCHAR(200),
    google_maps_embed_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE contact_phones (
    contact_id VARCHAR(50) NOT NULL REFERENCES contact_info(id) ON DELETE CASCADE,
    phone VARCHAR(50) NOT NULL
);

CREATE TABLE working_hours (
    id BIGSERIAL PRIMARY KEY,
    contact_id VARCHAR(50) NOT NULL REFERENCES contact_info(id) ON DELETE CASCADE,
    label VARCHAR(200) NOT NULL,
    hours VARCHAR(100) NOT NULL
);

CREATE TABLE social_links (
    id BIGSERIAL PRIMARY KEY,
    contact_id VARCHAR(50) NOT NULL REFERENCES contact_info(id) ON DELETE CASCADE,
    platform VARCHAR(30) NOT NULL,
    url VARCHAR(500) NOT NULL,
    handle VARCHAR(200)
);

-- Support Requests
CREATE TABLE support_requests (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(200),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
