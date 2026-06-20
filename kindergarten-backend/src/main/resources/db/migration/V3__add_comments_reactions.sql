CREATE TABLE news_comments (
    id          BIGSERIAL PRIMARY KEY,
    article_id  VARCHAR(50) NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    message     TEXT NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_article_status ON news_comments(article_id, status);

CREATE TABLE news_reactions (
    article_id  VARCHAR(50) NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
    reaction    VARCHAR(20) NOT NULL,
    count       BIGINT NOT NULL DEFAULT 0,
    PRIMARY KEY (article_id, reaction)
);
