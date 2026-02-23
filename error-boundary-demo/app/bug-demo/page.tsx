export default function BugDemo() {
  // Bilinçli olarak hata fırlatıyoruz
  throw new Error("Bilinçli olarak fırlatılan hata!")

  return <div>Bu içerik asla görünmez.</div>
}