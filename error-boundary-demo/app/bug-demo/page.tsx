export default function BugDemo() {
  // 💥 Bilinçli olarak bir hata fırlatılır. 
  // Kod bu satıra geldiği anda durur ve aşağıdaki return kısmına asla geçmez.
  throw new Error("Bilinçli olarak fırlatılan hata!")

  return <div>Bu içerik asla görünmez.</div>
}