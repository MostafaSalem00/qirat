using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class UpdatesAtPlanAndOrderItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Metals_MetalId",
                table: "OrderItems");

            migrationBuilder.DropTable(
                name: "MetalTypes");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_MetalId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "MetalId",
                table: "OrderItems");

            migrationBuilder.AddColumn<int>(
                name: "OrderItemId",
                table: "Metals",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AlternativeMetals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AlternativeMetals", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AlternativeMetals");

            migrationBuilder.DropColumn(
                name: "OrderItemId",
                table: "Metals");

            migrationBuilder.AddColumn<int>(
                name: "MetalId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "MetalTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetalTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_MetalId",
                table: "OrderItems",
                column: "MetalId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_Metals_MetalId",
                table: "OrderItems",
                column: "MetalId",
                principalTable: "Metals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
