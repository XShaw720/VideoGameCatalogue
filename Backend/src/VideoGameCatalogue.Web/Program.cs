using Microsoft.EntityFrameworkCore;
using VideoGameCatalogue.Core;
using VideoGameCatalogue.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContextFactory<Context>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("VideoGameCatalogue")));

builder.Services.AddGraphQLServer()
        .RegisterDbContextFactory<Context>()
        .AddQueryType<Query>()
        .AddMutationType<Mutation>()
        .AddProjections()
        .AddFiltering()
        .AddSorting();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGraphQL();

app.Run();
