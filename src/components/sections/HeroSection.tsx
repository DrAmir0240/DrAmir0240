"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Code2,
  Cpu,
  Copy,
  Check,
  Activity,
  GitBranch,
  FileCode2,
  Radio,
  Server,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface HeroSectionProps {
  locale: string;
  profile?: {
    fullNameEn?: string;
    fullNameFa?: string;
    titleEn?: string;
    titleFa?: string;
    bioEn?: string;
    bioFa?: string;
    avatarUrl?: string | null;
    yearsExperience?: number;
    email?: string;
  };
  t: {
    role: string;
    tagline: string;
    ctaProjects: string;
    ctaContact: string;
    statsExp: string;
    statsProjects: string;
    statsUptime: string;
    badgeStatus: string;
  };
}

type TabType = "python" | "workflow" | "metrics";

export function HeroSection({ locale, profile, t }: HeroSectionProps) {
  const isFa = locale === "fa";
  const ArrowIcon = isFa ? ArrowLeft : ArrowRight;

  const fullName = isFa ? (profile?.fullNameFa || "امیرحسین امیدی") : (profile?.fullNameEn || "Amirhossein Omidi");
  const roleTitle = isFa ? (profile?.titleFa || t.role) : (profile?.titleEn || t.role);
  const bio = isFa ? (profile?.bioFa || t.tagline) : (profile?.bioEn || t.tagline);
  const avatarUrl = profile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800";
  const years = profile?.yearsExperience || 8;

  const [activeTab, setActiveTab] = useState<TabType>("python");
  const [copied, setCopied] = useState(false);

  const tabs: { id: TabType; filename: string; lang: string; icon: React.ReactNode }[] = [
    { id: "python", filename: "pipeline.py", lang: "python", icon: <FileCode2 className="w-3.5 h-3.5 text-slate-300" /> },
    { id: "workflow", filename: "deploy.yml", lang: "yaml", icon: <GitBranch className="w-3.5 h-3.5 text-slate-300" /> },
    { id: "metrics", filename: "metrics.json", lang: "json", icon: <Activity className="w-3.5 h-3.5 text-slate-300" /> },
  ];

  const codeSnippets: Record<TabType, { lines: Array<{ num: string; content: React.ReactNode }>; copyText: string }> = {
    python: {
      copyText: `from systems import DistributedEngine, EventStream\nfrom mcp.protocol import ContextSession\n\n@engine.pipeline(runtime="asyncio", cluster="prod-eu-1")\nasync def route_telemetry(tenant_id: str) -> dict:\n    async with ContextSession(agent_pool="dynamic") as session:\n        stream = await EventStream.subscribe(f"tenants.{tenant_id}.events")\n        dispatched = await session.distribute(stream, concurrency=256)\n        return {\n            "status": "HEALTHY",\n            "p99_latency_ms": 11.8,\n            "throughput_rps": 48500\n        }`,
      lines: [
        { num: "01", content: <><span><span className="text-white font-semibold">from</span> systems <span className="text-white font-semibold">import</span> <span className="text-slate-300">DistributedEngine</span>, <span className="text-slate-300">EventStream</span></span></> },
        { num: "02", content: <><span><span className="text-white font-semibold">from</span> mcp.protocol <span className="text-white font-semibold">import</span> <span className="text-slate-300">ContextSession</span></span></> },
        { num: "03", content: <span className="text-slate-600"></span> },
        { num: "04", content: <><span><span className="text-slate-400">@engine.pipeline</span>(runtime=<span className="text-white">&quot;asyncio&quot;</span>, cluster=<span className="text-white">&quot;prod-eu-1&quot;</span>)</span></> },
        { num: "05", content: <><span><span className="text-white font-semibold">async def</span> <span className="text-white font-bold">route_telemetry</span>(tenant_id: <span className="text-slate-300">str</span>) -&gt; <span className="text-slate-300">dict</span>:</span></> },
        { num: "06", content: <><span className="ps-4"><span className="text-white font-semibold">async with</span> ContextSession(agent_pool=<span className="text-white">&quot;dynamic&quot;</span>) <span className="text-white font-semibold">as</span> session:</span></> },
        { num: "07", content: <><span className="ps-8">stream = <span className="text-white font-semibold">await</span> EventStream.subscribe(<span className="text-slate-300">f&quot;tenants.&#123;tenant_id&#125;.events&quot;</span>)</span></> },
        { num: "08", content: <><span className="ps-8">dispatched = <span className="text-white font-semibold">await</span> session.distribute(stream, concurrency=<span className="text-white font-bold">256</span>)</span></> },
        { num: "09", content: <><span className="ps-8"><span className="text-white font-semibold">return</span> &#123;</span></> },
        { num: "10", content: <><span className="ps-12"><span className="text-slate-300">&quot;status&quot;</span>: <span className="text-white font-bold">&quot;HEALTHY&quot;</span>,</span></> },
        { num: "11", content: <><span className="ps-12"><span className="text-slate-300">&quot;p99_latency_ms&quot;</span>: <span className="text-white font-bold">11.8</span>,</span></> },
        { num: "12", content: <><span className="ps-12"><span className="text-slate-300">&quot;throughput_rps&quot;</span>: <span className="text-white font-bold">48500</span></span></> },
        { num: "13", content: <><span className="ps-8">&#125;</span></> },
      ],
    },
    workflow: {
      copyText: `name: Production Deployment\non:\n  push:\n    branches: [ "master" ]\n\njobs:\n  deploy-cluster:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Build Standalone Next & Worker Container\n        run: docker compose -f docker-compose.prod.yml build --no-cache\n      - name: Rolling Zero-Downtime Deploy\n        run: ./scripts/deploy-canary.sh --target=kubernetes --canary=10%`,
      lines: [
        { num: "01", content: <><span><span className="text-slate-400">name:</span> <span className="text-white font-semibold">Production Deployment</span></span></> },
        { num: "02", content: <><span><span className="text-slate-400">on:</span></span></> },
        { num: "03", content: <><span className="ps-4"><span className="text-slate-400">push:</span></span></> },
        { num: "04", content: <><span className="ps-8"><span className="text-slate-400">branches:</span> [ <span className="text-white">&quot;master&quot;</span> ]</span></> },
        { num: "05", content: <span className="text-slate-600"></span> },
        { num: "06", content: <><span><span className="text-slate-400">jobs:</span></span></> },
        { num: "07", content: <><span className="ps-4"><span className="text-white font-bold">deploy-cluster:</span></span></> },
        { num: "08", content: <><span className="ps-8"><span className="text-slate-400">runs-on:</span> <span className="text-slate-300">ubuntu-latest</span></span></> },
        { num: "09", content: <><span className="ps-8"><span className="text-slate-400">steps:</span></span></> },
        { num: "10", content: <><span className="ps-10">- <span className="text-slate-400">uses:</span> <span className="text-slate-300">actions/checkout@v4</span></span></> },
        { num: "11", content: <><span className="ps-10">- <span className="text-slate-400">name:</span> <span className="text-white">Run Distributed Healthchecks</span></span></> },
        { num: "12", content: <><span className="ps-12"><span className="text-slate-400">run:</span> <span className="text-slate-300">pytest tests/integration/ -v --parallel</span></span></> },
        { num: "13", content: <><span className="ps-10">- <span className="text-slate-400">name:</span> <span className="text-white">Zero-Downtime Rolling Rollout</span></span></> },
      ],
    },
    metrics: {
      copyText: `{\n  "cluster_id": "core-mesh-prod-01",\n  "system_health": 1.0,\n  "p99_latency": "11.8ms",\n  "active_nodes": 16,\n  "kafka_lag": 0,\n  "mcp_agent_sessions": 32,\n  "uptime": "99.98%"\n}`,
      lines: [
        { num: "01", content: <><span>&#123;</span></> },
        { num: "02", content: <><span className="ps-4"><span className="text-slate-400">&quot;cluster_id&quot;</span>: <span className="text-white">&quot;core-mesh-prod-01&quot;</span>,</span></> },
        { num: "03", content: <><span className="ps-4"><span className="text-slate-400">&quot;orchestrator&quot;</span>: <span className="text-white">&quot;FastAPI + Next.js AppRouter&quot;</span>,</span></> },
        { num: "04", content: <><span className="ps-4"><span className="text-slate-400">&quot;distributed_mesh&quot;</span>: &#123;</span></> },
        { num: "05", content: <><span className="ps-8"><span className="text-slate-400">&quot;active_shards&quot;</span>: <span className="text-white font-bold">16</span>,</span></> },
        { num: "06", content: <><span className="ps-8"><span className="text-slate-400">&quot;event_bus&quot;</span>: <span className="text-white">&quot;Apache Kafka 3.7&quot;</span>,</span></> },
        { num: "07", content: <><span className="ps-8"><span className="text-slate-400">&quot;cache_layer&quot;</span>: <span className="text-white">&quot;Redis Cluster (Hit: 99.4%)&quot;</span></span></> },
        { num: "08", content: <><span className="ps-4">&#125;,</span></> },
        { num: "09", content: <><span className="ps-4"><span className="text-slate-400">&quot;telemetry&quot;</span>: &#123;</span></> },
        { num: "10", content: <><span className="ps-8"><span className="text-slate-400">&quot;p99_latency_ms&quot;</span>: <span className="text-white font-bold">11.8</span>,</span></> },
        { num: "11", content: <><span className="ps-8"><span className="text-slate-400">&quot;error_rate&quot;</span>: <span className="text-white">&quot;0.0001%&quot;</span>,</span></> },
        { num: "12", content: <><span className="ps-8"><span className="text-slate-400">&quot;mcp_sessions&quot;</span>: <span className="text-white font-bold">32</span></span></> },
        { num: "13", content: <><span className="ps-4">&#125;</span></> },
        { num: "14", content: <><span>&#125;</span></> },
      ],
    },
  };

  const currentSnippet = codeSnippets[activeTab];

  const copyCurrentCode = () => {
    navigator.clipboard.writeText(currentSnippet.copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[88vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Subtle, soft ambient white/slate glows */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-96 h-96 rounded-full bg-white/[0.03] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-white/[0.02] blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Minimal Typography, Avatar, Bio */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            
            {/* Minimal Avatar + Status Badge */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-white/20 bg-black/40 shadow-md">
                <Image
                  src={avatarUrl}
                  alt={fullName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/20 text-xs font-mono text-white shadow-sm shadow-white/5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>{t.badgeStatus}</span>
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  {fullName}
                </div>
              </div>
            </div>

            {/* Clean Minimal Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
              {isFa ? (
                <>
                  معمار ارشد سیستم‌های <span className="text-white underline decoration-white/40 underline-offset-8">توزیع‌شده</span> و مقیاس‌پذیر
                </>
              ) : (
                <>
                  Architecting <span className="text-white underline decoration-white/40 underline-offset-8">Distributed Systems</span> & High-Load Backends
                </>
              )}
            </h1>

            {/* Role title pill */}
            <div className="text-sm sm:text-base text-slate-300 font-mono mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-white" />
              <span>{roleTitle}</span>
            </div>

            {/* Clean bio */}
            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mb-8 font-light">
              {bio}
            </p>

            {/* Minimalist Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-black text-sm font-semibold transition-all hover:gap-3 shadow-lg shadow-white/10"
              >
                <span>{t.ctaProjects}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>
              <a
                href={`mailto:${profile?.email || "contact@amirhossein.dev"}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/30 text-slate-200 hover:text-white text-sm font-medium transition-colors"
              >
                <span>{t.ctaContact}</span>
              </a>
            </div>

            {/* Minimal Stats */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-md pt-4 border-t border-white/[0.08]">
              <div>
                <div className="text-2xl font-bold font-mono text-white">
                  {years}<span className="text-white/60">+</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsExp}</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">
                  15<span className="text-white/60">+</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsProjects}</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">
                  99.9<span className="text-white/60">%</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsUptime}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Multi-Tab Code & System Telemetry Component */}
          <div className="lg:col-span-6 relative w-full" dir="ltr">
            <GlassCard className="!p-0 border border-white/15 shadow-2xl shadow-black/90 overflow-hidden" glow>
              
              {/* Modern Minimal Code Editor Header */}
              <div className="px-4 py-2.5 bg-[#0e0f14] border-b border-white/[0.08] flex items-center justify-between gap-3">
                
                {/* Left: Window Dots + Interactive Tabs */}
                <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                  {/* macOS dots */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/40 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10 inline-block" />
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1.5 flex-nowrap">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 ${
                            isActive
                              ? "bg-white/15 text-white border border-white/30 shadow-sm"
                              : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.filename}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Copy Snippet Action */}
                <button
                  onClick={copyCurrentCode}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/[0.06] flex-shrink-0"
                  title="Copy code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span className="text-white text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Workspace with Line Numbers */}
              <div className="p-4 sm:p-5 font-mono text-xs leading-relaxed bg-[#0a0b0f] text-slate-300 overflow-x-auto">
                <div className="min-w-[420px] space-y-1">
                  {currentSnippet.lines.map((line, idx) => (
                    <div key={idx} className="flex items-baseline group hover:bg-white/[0.03] rounded px-1 -mx-1">
                      <span className="w-8 text-[11px] text-slate-600 select-none text-right pe-3 font-mono">
                        {line.num}
                      </span>
                      <div className="flex-1 whitespace-pre font-mono">
                        {line.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sleek Minimal Status & Micro-Telemetric Bar */}
              <div className="px-4 sm:px-5 py-2.5 bg-[#0e0f14] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span className="text-white font-semibold">MESH_ONLINE</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-slate-400" />
                    <span>ASYNCIO: 256 WKR</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300 ms-auto">
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-200">p99: 11.8ms</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    <Server className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-200">FastAPI / K8s</span>
                  </div>
                </div>
              </div>

            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
