import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"
import { locations } from "#constants"
import { ChevronLeft, ChevronRight, Copy, PanelLeft, Plus, Search, Share, ShieldHalf, Star, Folder, ExternalLink } from "lucide-react"

const Safari = ({ isMobile }) => {
  const repos = locations.work.children.map((project) => {
    const descriptionFile = project.children?.find((child) => child?.fileType === 'txt')
    const linkFile = project.children?.find((child) => child?.fileType === 'url')
    const imageFile = project.children?.find((child) => child?.fileType === 'img')

    return {
      id: project.id,
      name: project.name,
      description: descriptionFile?.description?.[0] ?? `Repository for ${project.name}`,
      href: linkFile?.href ?? '#',
      image: imageFile?.imageUrl ?? '/images/folder.png',
    }
  })

  if (isMobile) {
    return (
      <div className="mobile-github">
        <div className="gh-head">
          <p className="eyebrow">GitHub</p>
          <h2>My repositories</h2>
          <p className="sub">A curated list of my main projects with repo details and quick links.</p>
        </div>

        <div className="gh-list">
          {repos.map((repo) => (
            <div key={repo.id} className="gh-card">
              <div className="gh-card-top">
                <div className="gh-icon">
                  <Folder size={18} />
                </div>
                <div className="gh-meta">
                  <a href={repo.href} target="_blank" rel="noreferrer" className="gh-name">{repo.name}</a>
                  <p className="gh-desc">{repo.description}</p>
                </div>
              </div>

              <div className="gh-stats">
                <span><Star size={14} /> 24</span>
                <span><ExternalLink size={14} /> Live demo</span>
              </div>

              <div className="gh-tags">
                <span>JavaScript</span>
                <span>5 issues</span>
                <span>12 pull requests</span>
                <span>Updated today</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
    <div id="window-header">
        <WindowControls target="safari"/>

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
            <ChevronLeft className="icon"/>
            <ChevronRight className="icon"/>
        </div>

        <div className="flex-1 flex-center gap-3">
            <ShieldHalf className="icon"/>

            <div className="search">
                <Search className="icon"/>

                <input type="text" name="" id="" placeholder="Search repositories" className="flex-1" />
            </div>
        </div>

        <div className="flex items-center gap-5">
            <Share className="icon"/>
            <Plus className="icon"/>
            <Copy className="icon"/>
        </div>
    </div>

    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">GitHub</p>
          <h2 className="text-2xl font-semibold text-slate-900">My repositories</h2>
          <p className="text-sm text-gray-600">A curated list of my main projects with repo details and quick links.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">New</button>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Create repository</button>
        </div>
      </div>

      <div className="grid gap-4">
        {repos.map((repo) => (
          <div key={repo.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
                  <Folder className="h-5 w-5" />
                </div>
                <div>
                  <a href={repo.href} target="_blank" rel="noreferrer" className="text-lg font-semibold text-slate-900 hover:text-slate-700">{repo.name}</a>
                  <p className="mt-1 text-sm text-slate-500">{repo.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"> <Star className="h-4 w-4" /> 24 </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"> <ExternalLink className="h-4 w-4" /> Live demo </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full bg-slate-100 px-3 py-1">JavaScript</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">5 issues</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">12 pull requests</span>
              <span className="rounded-full bg-slate-100 px-3 py-1">Updated today</span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

const SafariWindow = WindowWrapper(Safari, "safari", { mobileTitle: "Safari" })
export default SafariWindow