using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class ActivityModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GenericValue",
                table: "ActivitySet");

            migrationBuilder.DropColumn(
                name: "Message",
                table: "ActivitySet");

            migrationBuilder.AlterColumn<byte>(
                name: "Type",
                table: "ActivitySet",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "TicketID",
                table: "ActivitySet",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Read",
                table: "ActivitySet",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "New",
                table: "ActivitySet",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Old",
                table: "ActivitySet",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "New",
                table: "ActivitySet");

            migrationBuilder.DropColumn(
                name: "Old",
                table: "ActivitySet");

            migrationBuilder.AlterColumn<int>(
                name: "Type",
                table: "ActivitySet",
                type: "integer",
                nullable: false,
                oldClrType: typeof(byte));

            migrationBuilder.AlterColumn<int>(
                name: "TicketID",
                table: "ActivitySet",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<bool>(
                name: "Read",
                table: "ActivitySet",
                type: "boolean",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<byte>(
                name: "GenericValue",
                table: "ActivitySet",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "ActivitySet",
                type: "text",
                nullable: true);
        }
    }
}
