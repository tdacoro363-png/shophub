import "dotenv/config";
import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const arquivo =
  "1005_200150_Shopee Oficial BR - 2022_20260805T050216_1.csv";

const BATCH_SIZE = 500;

let batch: any[] = [];
let total = 0;
function limparProduto(produto: any) {
  for (const chave in produto) {
    if (typeof produto[chave] === "string") {
      produto[chave] = produto[chave].replace(/\u0000/g, "");
    }
  }

  return produto;
}

async function importarBatch() {
  if (batch.length === 0) return;

  const produtos = batch;
  batch = [];

  const dados = produtos
  .map(limparProduto)
  .filter((produto) => produto.itemid && produto.title)
    .map((produto) => ({
      id: String(produto.itemid),
      title: produto.title,
      description: produto.description || null,
      price: Number(produto.price) || 0,
      salePrice: Number(produto.sale_price) || null,
      discountPercentage:
        Number(produto.discount_percentage) || null,
      shopRating: Number(produto.shop_rating) || null,
      itemRating: Number(produto.item_rating) || null,
      likes: Number(produto.like) || null,
      shopName: produto.shop_name || null,
      imageLink: produto.image_link || null,
      imageLink3: produto.image_link_3 || null,
      productLink: produto.product_link || null,
      productShortLink:
        produto["product_short link"] || null,
      category1: produto.global_category1 || null,
      category2: produto.global_category2 || null,
      category3: produto.global_category3 || null,
      categoryId1: produto.global_catid1
        ? String(produto.global_catid1)
        : null,
      categoryId2: produto.global_catid2
        ? String(produto.global_catid2)
        : null,
      categoryId3: produto.global_catid3
        ? String(produto.global_catid3)
        : null,
      cbOption: produto.cb_option || null,
      condition: produto.condition || null,
      modelIds: produto.model_ids || null,
      modelNames: produto.model_names || null,
    }));

  if (dados.length === 0) return;

  await prisma.product.createMany({
    data: dados,
    skipDuplicates: true,
  });

  total += dados.length;

  console.log(`Importados: ${total} produtos`);
}

async function main() {
  console.log("🚀 Iniciando importação...");
  console.log("Arquivo:", arquivo);

  const stream = fs
    .createReadStream(arquivo)
    .pipe(csv());

  for await (const produto of stream) {
    batch.push(produto);

    if (batch.length >= BATCH_SIZE) {
      await importarBatch();
    }
  }

  await importarBatch();

  console.log("");
  console.log(
    `✅ Importação concluída! Total: ${total} produtos.`
  );

  await prisma.$disconnect();
}

main().catch(async (erro) => {
  console.error("❌ Erro durante a importação:");
  console.error(erro);

  await prisma.$disconnect();
  process.exit(1);
});