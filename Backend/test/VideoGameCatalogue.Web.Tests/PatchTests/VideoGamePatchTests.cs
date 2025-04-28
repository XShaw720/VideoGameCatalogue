using AutoFixture;
using AutoFixture.AutoMoq;
using NUnit.Framework;
using FluentAssertions;
using VideoGameCatalogue.Core.Models.Entites;
using VideoGameCatalogue.Web.Models.Patch;

namespace VideoGameCatalogue.Web.Tests.PatchTests;

public class VideoGamePatchTests
{

    private IFixture _fixture = default!;

    [SetUp]
    public void SetUp()
    {
        _fixture = new Fixture().Customize(new AutoMoqCustomization());
    }

    [Test]
    public void ApplyTo_WithAllFields_ShouldApplyAllFields()
    {
        // Arrange
        var videoGame = _fixture.Create<VideoGame>();
        var patch = _fixture.Create<VideoGamePatch>();

        // Act
        patch.ApplyTo(videoGame);

        // Assert
        videoGame.Title.Should().Be(patch.Title);
        videoGame.Genre.Should().Be(patch.Genre);
        videoGame.Description.Should().Be(patch.Description);
    }

    [Test]
    public void ApplyTo_WithoutTitle_ShouldNotApplyTitle()
    {
        // Arrange
        var expectedTitle = _fixture.Create<string>();
        var videoGame = _fixture.Build<VideoGame>()
            .With(x => x.Title, expectedTitle)
            .Create();
        var patch = _fixture.Build<VideoGamePatch>()
            .Without(x => x.Title)
            .Create();

        // Act
        patch.ApplyTo(videoGame);

        // Assert
        videoGame.Title.Should().NotBeNull();
        videoGame.Title.Should().Be(expectedTitle);
    }

    [Test]
    public void ApplyTo_WithoutGenre_ShouldNotApplyGenre()
    {
        // Arrange
        var expectedGenre = _fixture.Create<string>();
        var videoGame = _fixture.Build<VideoGame>()
            .With(x => x.Genre, expectedGenre)
            .Create();
        var patch = _fixture.Build<VideoGamePatch>()
            .Without(x => x.Genre)
            .Create();

        // Act
        patch.ApplyTo(videoGame);

        // Assert
        videoGame.Genre.Should().NotBeNull();
        videoGame.Genre.Should().Be(expectedGenre);
    }

    [Test]
    public void ApplyTo_WithoutDescription_ShouldNotApplyDescription()
    {
        // Arrange
        var expectedDescription = _fixture.Create<string>();
        var videoGame = _fixture.Build<VideoGame>()
            .With(x => x.Description, expectedDescription)
            .Create();
        var patch = _fixture.Build<VideoGamePatch>()
            .Without(x => x.Description)
            .Create();

        // Act
        patch.ApplyTo(videoGame);

        // Assert
        videoGame.Description.Should().NotBeNull();
        videoGame.Description.Should().Be(expectedDescription);
    }

    [Test]
    public void ApplyTo_WithNoFields_ShouldNotApplyAnyFields()
    {
        // Arrange
        var expectedTitle = _fixture.Create<string>();
        var expectedGenre = _fixture.Create<string>();
        var expectedDescription = _fixture.Create<string>();

        VideoGame videoGame = new()
        {
            Title = expectedTitle,
            Genre = expectedGenre,
            Description = expectedDescription
        };
        VideoGamePatch patch = new()
        {
            Id = 1
        };

        // Act
        patch.ApplyTo(videoGame);

        // Assert
        videoGame.Title.Should().NotBeNull();
        videoGame.Title.Should().Be(expectedTitle);
        videoGame.Genre.Should().NotBeNull();
        videoGame.Genre.Should().Be(expectedGenre);
        videoGame.Description.Should().NotBeNull();
        videoGame.Description.Should().Be(expectedDescription);
    }
}
