using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class UpdatePlanInvitationModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "PlanInvitations");

            migrationBuilder.DropColumn(
                name: "Invitee",
                table: "PlanInvitations");

            migrationBuilder.AddColumn<string>(
                name: "ToEmail",
                table: "PlanInvitations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToEmail",
                table: "PlanInvitations");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "PlanInvitations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Invitee",
                table: "PlanInvitations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
