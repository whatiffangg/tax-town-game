import shopBackground from "@/assets/shop-background.png";

const ShopScene2D = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `url(${shopBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default ShopScene2D;
