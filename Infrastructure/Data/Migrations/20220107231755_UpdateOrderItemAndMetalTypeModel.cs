using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class UpdateOrderItemAndMetalTypeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_Metals_MetalId",
                table: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderItems_MetalId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "MetalId",
                table: "OrderItems");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "MetalTypes");

            migrationBuilder.AddColumn<int>(
                name: "AlternativeId",
                table: "MetalTypes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrderItemId",
                table: "Metals",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AlternativeId",
                table: "MetalTypes");

            migrationBuilder.DropColumn(
                name: "OrderItemId",
                table: "Metals");

            migrationBuilder.AddColumn<int>(
                name: "MetalId",
                table: "OrderItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "MetalTypes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

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
