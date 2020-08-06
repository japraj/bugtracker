using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Tag = table.Column<string>(maxLength: 15, nullable: false),
                    Avatar = table.Column<string>(nullable: false),
                    Rank = table.Column<int>(nullable: false),
                    Tickets = table.Column<List<string>>(nullable: false),
                    Activity = table.Column<List<string>>(nullable: false),
                    Notifications = table.Column<List<string>>(nullable: false),
                    SessionKey = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Tag);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
