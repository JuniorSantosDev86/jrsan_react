import { useState } from 'react'
import { IconType } from 'react-icons'
import {
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobelightroomclassic,
  SiFigma,
  SiFlutter,
  SiDart,
  SiReact,
  SiTypescript,
  SiFirebase,
  SiNodedotjs,
  SiGit,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { RiPaletteFill, RiCodeSSlashLine, RiToolsFill } from 'react-icons/ri'
import { useTranslation } from '../features/i18n/i18n'

type Skill = {
  name: string
  icon: IconType
  color: string
  glowClass: string
}

type SkillCategory = {
  title: string
  description: string
  icon: IconType
  iconClass: string
  wrapperClass: string
}

function SkillsStrip() {
  const { t } = useTranslation()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skills: Skill[] = [
    { name: 'Adobe Illustrator', icon: SiAdobeillustrator, color: '#FF9A00', glowClass: 'hover:shadow-[0_14px_32px_rgba(255,154,0,0.28)]' },
    { name: 'Adobe Photoshop', icon: SiAdobephotoshop, color: '#31A8FF', glowClass: 'hover:shadow-[0_14px_32px_rgba(49,168,255,0.28)]' },
    { name: 'Adobe Lightroom', icon: SiAdobelightroomclassic, color: '#0F4C81', glowClass: 'hover:shadow-[0_14px_32px_rgba(15,76,129,0.28)]' },
    { name: 'Figma', icon: SiFigma, color: '#A259FF', glowClass: 'hover:shadow-[0_14px_32px_rgba(162,89,255,0.32)]' },
    { name: 'Flutter', icon: SiFlutter, color: '#46D1FD', glowClass: 'hover:shadow-[0_14px_32px_rgba(70,209,253,0.32)]' },
    { name: 'Dart', icon: SiDart, color: '#0175C2', glowClass: 'hover:shadow-[0_14px_32px_rgba(1,117,194,0.3)]' },
    { name: 'React', icon: SiReact, color: '#61DAFB', glowClass: 'hover:shadow-[0_14px_32px_rgba(97,218,251,0.35)]' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', glowClass: 'hover:shadow-[0_14px_32px_rgba(49,120,198,0.3)]' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', glowClass: 'hover:shadow-[0_14px_32px_rgba(255,202,40,0.32)]' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#68A063', glowClass: 'hover:shadow-[0_14px_32px_rgba(104,160,99,0.32)]' },
    { name: 'Git', icon: SiGit, color: '#F1502F', glowClass: 'hover:shadow-[0_14px_32px_rgba(241,80,47,0.3)]' },
    { name: 'VS Code', icon: VscCode, color: '#007ACC', glowClass: 'hover:shadow-[0_14px_32px_rgba(0,122,204,0.3)]' },
  ]

  const categories: SkillCategory[] = [
    {
      title: 'Design',
      description: 'UI/UX Design, Branding, Illustration',
      icon: RiPaletteFill,
      iconClass: 'text-pink-300',
      wrapperClass: 'bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-indigo-500/10',
    },
    {
      title: 'Development',
      description: 'Flutter, React, TypeScript, Node.js',
      icon: RiCodeSSlashLine,
      iconClass: 'text-sky-300',
      wrapperClass: 'bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-blue-500/10',
    },
    {
      title: 'Tools',
      description: 'Figma, Firebase, Git, Cloud Services',
      icon: RiToolsFill,
      iconClass: 'text-emerald-300',
      wrapperClass: 'bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-green-500/10',
    },
  ]

  const duplicatedSkills = [...skills, ...skills]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {t('skills.title')}
          </h2>
        </div>

        {/* Skills Marquee */}
        <div className="relative md:overflow-x-hidden md:overflow-y-visible">
          {/* Gradient Overlays */}
          <div className="hidden md:block absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="skills-marquee hidden md:inline-flex items-start space-x-10 py-10 overflow-visible min-h-[150px]">
            {duplicatedSkills.map((skill, index) => {
              const Icon = skill.icon

              return (
                <div
                  key={`${skill.name}-${index}`}
                  className="skill-icon group relative z-20"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-xl border border-border/60 bg-gradient-to-br from-background/65 via-background/45 to-background/35 flex items-center justify-center text-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 ${skill.glowClass}`}
                  >
                    <Icon style={{ color: skill.color }} className="transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {hoveredSkill === skill.name && (
                    <div className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 px-3 py-1 bg-popover/95 backdrop-blur-sm text-popover-foreground text-sm rounded-md shadow-lg border whitespace-nowrap z-30 pointer-events-none animate-scale-in">
                      {skill.name}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-popover/95" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Alternative Layout for Mobile */}
          <div className="md:hidden mt-10">
            <div className="grid grid-cols-4 gap-4">
              {skills.map((skill) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
                    className="skill-icon relative flex justify-center"
                    onClick={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
                  >
                    <div className={`w-12 h-12 rounded-xl border border-border/60 bg-card flex items-center justify-center text-xl ${skill.glowClass}`}>
                      <Icon style={{ color: skill.color }} className="text-2xl" />
                    </div>
                    {hoveredSkill === skill.name && (
                      <div className="absolute top-full mt-2 w-max max-w-[8rem] px-2 py-1 text-xs text-center rounded-md border bg-popover/95 text-popover-foreground shadow-lg z-30">
                        {skill.name}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Skill Categories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.title} className="text-center glass-card px-6 py-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors duration-300">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.wrapperClass}`}>
                  <Icon className={`text-3xl ${category.iconClass}`} />
                </div>
                <h3 className="font-semibold mb-2 text-lg text-foreground">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SkillsStrip
