package com.kindergarten.backend.common;

import com.kindergarten.backend.enums.*;
import com.kindergarten.backend.entity.*;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

public class TestDataFactory {

    public static HeroSlide heroSlide(String id) {
        return HeroSlide.builder()
                .id(id)
                .imageUrl("https://picsum.photos/seed/" + id + "/1400/700")
                .altText("Test slide " + id)
                .heading("Heading " + id)
                .subheading("Subheading " + id)
                .ctaLabel("CTA")
                .ctaLink("/test")
                .orderIndex(1)
                .build();
    }

    public static StaffMember staffMember(String id, StaffDepartment department) {
        return StaffMember.builder()
                .id(id)
                .fullName("Nguyễn Thị Test " + id)
                .role("Giáo Viên")
                .department(department)
                .photo("https://picsum.photos/seed/" + id + "/400/400")
                .bio("Bio test.")
                .featured(false)
                .groupRole(GroupRole.MEMBER)
                .experience(5)
                .qualifications(List.of("Cử nhân Sư Phạm"))
                .specialties(List.of("Nghệ thuật"))
                .build();
    }

    public static StaffMember staffLeader(String id, StaffDepartment department) {
        return StaffMember.builder()
                .id(id)
                .fullName("Nguyễn Thị Leader " + id)
                .role("Tổ Trưởng")
                .department(department)
                .photo("https://picsum.photos/seed/" + id + "/400/400")
                .bio("Bio test.")
                .featured(true)
                .groupRole(GroupRole.LEADER)
                .experience(10)
                .qualifications(List.of("Cử nhân Sư Phạm"))
                .specialties(List.of("Lãnh đạo"))
                .build();
    }

    public static NewsArticle newsArticle(String id, String slug, NewsCategory category) {
        return NewsArticle.builder()
                .id(id)
                .title("Test Article " + id)
                .slug(slug)
                .excerpt("Excerpt " + id)
                .content("<p>Content " + id + "</p>")
                .coverImage("https://picsum.photos/seed/" + id + "/800/500")
                .publishedAt(OffsetDateTime.of(2025, 9, 1, 8, 0, 0, 0, ZoneOffset.ofHours(7)))
                .category(category)
                .featured(false)
                .tags(List.of("tag1", "tag2"))
                .build();
    }

    public static NewsArticle featuredNewsArticle(String id, String slug) {
        return NewsArticle.builder()
                .id(id)
                .title("Featured Article " + id)
                .slug(slug)
                .excerpt("Excerpt " + id)
                .content("<p>Content</p>")
                .coverImage("https://picsum.photos/seed/" + id + "/800/500")
                .publishedAt(OffsetDateTime.of(2025, 8, 1, 8, 0, 0, 0, ZoneOffset.ofHours(7)))
                .category(NewsCategory.SU_KIEN)
                .featured(true)
                .tags(List.of("featured"))
                .build();
    }

    public static GalleryAlbum galleryAlbum(String id, AgeGroup ageGroup, AlbumCategory category) {
        return GalleryAlbum.builder()
                .id(id)
                .title("Album " + id)
                .description("Description " + id)
                .coverImage("https://picsum.photos/seed/" + id + "/600/400")
                .ageGroup(ageGroup)
                .category(category)
                .build();
    }

    public static GalleryImage galleryImage(String id, GalleryAlbum album) {
        return GalleryImage.builder()
                .id(id)
                .album(album)
                .src("https://picsum.photos/seed/" + id + "/800/600")
                .alt("Ảnh " + id)
                .caption("Caption " + id)
                .width(800)
                .height(600)
                .build();
    }

    public static EducationalProgram educationalProgram(String id, String slug, AgeGroup ageGroup) {
        return EducationalProgram.builder()
                .id(id)
                .title("Program " + id)
                .slug(slug)
                .shortDescription("Short desc")
                .fullDescription("Full desc")
                .coverImage("https://picsum.photos/seed/" + id + "/600/400")
                .iconEmoji("📚")
                .ageGroup(ageGroup)
                .orderIndex(1)
                .weeklySchedule("3 buổi/tuần")
                .outcomes(List.of("Outcome 1", "Outcome 2"))
                .featuredImages(List.of("https://img1.jpg"))
                .build();
    }

    public static LearningMaterial learningMaterial(String id, MaterialCategory category, AgeGroup ageGroup) {
        return LearningMaterial.builder()
                .id(id)
                .title("Material " + id)
                .type(MaterialType.PDF)
                .icon("📚")
                .category(category)
                .description("Description")
                .fileUrl("/files/sample.pdf")
                .size("1.0 MB")
                .ageGroup(ageGroup)
                .build();
    }

    public static Facility facility(String id) {
        return Facility.builder()
                .id(id)
                .name("Facility " + id)
                .description("Description")
                .iconEmoji("🏫")
                .build();
    }

    public static FacilityImage facilityImage(String id, Facility facility) {
        return FacilityImage.builder()
                .id(id)
                .facility(facility)
                .src("https://picsum.photos/seed/" + id + "/800/600")
                .alt("Ảnh " + id)
                .width(800)
                .height(600)
                .build();
    }

    public static ContactInfo contactInfo() {
        return ContactInfo.builder()
                .id("contact-1")
                .schoolName("Trường Mầm Non Ánh Dương")
                .address("123 Đường Test")
                .district("Quận 5")
                .city("TP. Hồ Chí Minh")
                .email("test@test.edu.vn")
                .phones(List.of("028 3855 1234"))
                .build();
    }

    public static SupportRequest supportRequest() {
        return SupportRequest.builder()
                .id(1L)
                .name("Nguyễn Văn Test")
                .phone("0909 000 000")
                .email("test@example.com")
                .subject("Test subject")
                .message("Test message content")
                .status(SupportRequestStatus.PENDING)
                .build();
    }
}
