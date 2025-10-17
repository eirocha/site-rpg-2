'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Settings, Zap, Skull, Clock, Star, Users, BookOpen, ChevronRight, Sparkles, Gamepad2, Rocket } from 'lucide-react'
import SteampunkRPG from '@/components/SteampunkRPG'
import ZombieRPG from '@/components/ZombieRPG'
import SpaceRPG from '@/components/SpaceRPG'
import { useTheme } from '@/contexts/ThemeContext'
import '@/styles/animations.css'

interface SystemCard {
  id: string
  title: string
  subtitle: string
  description: string
  background: string
  backgroundSize?: string
  backgroundPosition?: string
  icon: React.ReactNode
  badges: string[]
  features: string[]
  rating: number
  players: string
  theme: 'steampunk' | 'zombie' | 'space'
  gradient: string
}

const systems: SystemCard[] = [
  {
    id: 'steampunk',
    title: 'DOMINUS Steampunk',
    subtitle: 'Era Vitoriana Alternativa',
    description: 'Entre em um mundo de engrenagens gigantes, autômatos conscientes e magia tecnológica. Pilotando dirigíveis piratas e explorando cidades flutuantes movidas a vapor.',
    background: 'linear-gradient(135deg, rgba(146, 64, 14, 0.9) 0%, rgba(180, 83, 9, 0.9) 25%, rgba(217, 119, 6, 0.9) 50%, rgba(245, 158, 11, 0.9) 75%, rgba(251, 191, 36, 0.9) 100%), url("/steampunk-banner.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    icon: <Settings className="w-8 h-8" />,
    badges: ['⚙️ Steampunk', '🔮 Magia Tecnológica', '🎭 Aventura', '🎲 D6 System'],
    features: [
      '5 Tabelas Interativas',
      'Modo Oráculo Integrado',
      'Geração de Personagens',
      'Cenas Dinâmicas',
      'Banco de Ideias'
    ],
    rating: 4.8,
    players: '2-6 jogadores',
    theme: 'steampunk',
    gradient: 'from-amber-600 via-orange-600 to-yellow-600'
  },
  {
    id: 'zombie',
    title: 'DOMINUS Zombie',
    subtitle: 'Sobrevivência Apocalíptica',
    description: 'Em um mundo devastado por um surto zumbi, cada dia é uma luta pela sobrevivência. Enfrente hordas, encontre recursos e tome decisões impossíveis.',
    background: 'linear-gradient(135deg, rgba(127, 29, 29, 0.9) 0%, rgba(153, 27, 27, 0.9) 25%, rgba(185, 28, 28, 0.9) 50%, rgba(220, 38, 38, 0.9) 75%, rgba(239, 68, 68, 0.9) 100%), url("/zombie-banner.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    icon: <Skull className="w-8 h-8" />,
    badges: ['🧟 Apocalipse Zumbi', '🩸 Horror Sobrevivência', '⚔️ Combate', '🎯 Sem Mestre'],
    features: [
      'Sistema de Sobrevivência',
      'Modo Oráculo de Perigo',
      'Personagens Especializados',
      'Cenas de Terror',
      'Recursos Limitados'
    ],
    rating: 4.9,
    players: '1-4 jogadores',
    theme: 'zombie',
    gradient: 'from-red-800 via-red-700 to-orange-700'
  },
  {
    id: 'space',
    title: 'DOMINUS Espacial',
    subtitle: 'Exploração Cósmica',
    description: 'Explore as profundezas do espaço, encontre espécies alienígenas, descubra planetas habitáveis e enfente os perigos do cosmos em aventuras intergalácticas.',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(59, 130, 246, 0.9) 25%, rgba(96, 165, 250, 0.9) 50%, rgba(147, 197, 253, 0.9) 75%, rgba(191, 219, 254, 0.9) 100%), url("/space-banner.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    icon: <Rocket className="w-8 h-8" />,
    badges: ['🚀 Exploração Espacial', '👽 Contato Alienígena', '⚡ Tecnologia Futurista', '🌌 Aventura Cósmica'],
    features: [
      'Sistema de Navegação',
      'Modo Oráculo Cósmico',
      'Tripulação Especializada',
      'Cenas Estelares',
      'Banco de Ideias Espaciais'
    ],
    rating: 4.7,
    players: '2-5 jogadores',
    theme: 'space',
    gradient: 'from-blue-600 via-purple-600 to-indigo-600'
  }
]

export default function Home() {
  const { currentTheme, setTheme } = useTheme()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Se um sistema foi selecionado, renderiza o componente correspondente
  if (currentTheme === 'steampunk') {
    return <SteampunkRPG />
  }
  
  if (currentTheme === 'zombie') {
    return <ZombieRPG />
  }

  if (currentTheme === 'space') {
    return <SpaceRPG />
  }

  // Renderiza a página inicial (catálogo) se currentTheme for 'home'
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header Netflix-style */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <img
                  src="/rpg-controller-logo.png"
                  alt="DOMINUS RPG Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">DOMINUS RPG</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-gray-800 text-white border-gray-700">
                <Clock className="w-4 h-4 mr-1" />
                Catálogo de Sistemas
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative z-10 text-center px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-red-600 text-white border-red-500 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Sistemas de RPG Sem Mestre
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              DOMINUS RPG
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Escolha seu universo e comece sua aventura. Sistemas completos de RPG narrativo sem mestre.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                1-6 Jogadores
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2">
                <BookOpen className="w-4 h-4 mr-2" />
                Regras Integradas
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Rápido para Jogar
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 text-gray-400 rotate-90" />
        </div>
      </section>

      {/* Systems Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Escolha Seu Sistema</h2>
            <p className="text-xl text-gray-400">Cada universo oferece uma experiência única de RPG</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {systems.map((system) => (
              <Card 
                key={system.id}
                className={`relative overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  hoveredCard === system.id 
                    ? 'transform scale-105 shadow-2xl border-white' 
                    : 'border-gray-800 hover:border-gray-600'
                }`}
                style={{ 
                  background: system.background,
                  backgroundSize: system.backgroundSize || 'cover',
                  backgroundPosition: system.backgroundPosition || 'center'
                }}
                onMouseEnter={() => setHoveredCard(system.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  setTheme(system.theme)
                }}
              >
                <CardContent className="p-0">
                  <div className="relative h-96 flex flex-col justify-between p-8">
                    {/* Overlay para melhor legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Conteúdo */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          {system.icon}
                        </div>
                        <div>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-2">
                            {system.subtitle}
                          </Badge>
                          <h3 className="text-2xl font-bold text-white">{system.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-white/90 mb-6 leading-relaxed">
                        {system.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {system.badges.map((badge, index) => (
                          <Badge 
                            key={index} 
                            className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-semibold">{system.rating}</span>
                          </div>
                          <div className="text-white/80 text-sm">
                            {system.players}
                          </div>
                        </div>
                        
                        <Button 
                          className={`bg-gradient-to-r ${system.gradient} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105`}
                        >
                          <Play className="w-5 h-5" />
                          Jogar Agora
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                        {system.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-white/50 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Por Que DOMINUS RPG?</h2>
            <p className="text-xl text-gray-400">Sistemas projetados para aventuras memoráveis</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sem Mestre Necessário</h3>
              <p className="text-gray-400">Sistemas completos que permitem que os jogadores controlem a narrativa</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rápido para Começar</h3>
              <p className="text-gray-400">Regras simples baseadas em D6, aprenda em minutos e jogue imediatamente</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Infinitas Histórias</h3>
              <p className="text-gray-400">Tabelas dinâmicas geram aventuras únicas a cada sessão</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold">DOMINUS RPG</span>
          </div>
          <p className="text-gray-400">
            Sistemas de RPG narrativo sem mestre para aventuras inesquecíveis
          </p>
        </div>
      </footer>
    </div>
  )
}