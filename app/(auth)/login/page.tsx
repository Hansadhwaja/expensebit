import LoginSection from "@/components/auth/Login/LoginSection"

const LoginPage = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background px-4 py-10">
      {/* Grid Background */}
      <div className="[background-image: linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px), linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] absolute inset-0 bg-size-[40px_40px] opacity-30" />

      {/* Spotlight */}
      <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      {/* Blob 1 */}
      <div className="animate-float absolute -top-20 -left-32 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl" />

      {/* Blob 2 */}
      <div className="animate-float-delayed absolute -right-24 -bottom-32 h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Blob 3 */}
      <div className="animate-float-slow absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

      {/* Floating Dots */}
      <div className="animate-dot absolute top-28 left-20 h-3 w-3 rounded-full bg-violet-500" />

      <div className="animate-dot-delay absolute top-40 right-24 h-4 w-4 rounded-full bg-sky-500" />

      <div className="animate-dot absolute bottom-24 left-1/4 h-2 w-2 rounded-full bg-primary" />

      <div className="animate-dot-delay absolute right-1/3 bottom-32 h-3 w-3 rounded-full bg-pink-500" />

      {/* Decorative Rings */}
      <div className="animate-spin-slow absolute top-24 -left-32 h-96 w-96 rounded-full border border-primary/10" />

      <div className="animate-spin-reverse absolute right-10 bottom-10 h-72 w-72 rounded-full border border-cyan-500/10" />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md">
        <LoginSection />
      </div>
    </main>
  )
}

export default LoginPage
