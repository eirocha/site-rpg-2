'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, BookOpen, Users, Map, Lightbulb, Settings, Clock, Zap, HelpCircle } from 'lucide-react'
import CharacterCard from '@/components/CharacterCard'
import '@/styles/animations.css'

interface TableData {
  d6: number
  content: string | string[]
}

interface RollResult {
  table: string
  result: number
  data: any
}

const rpgTables = {
  oraculo: [
    {
      d6: 1,
      resultado: "NÃO / Fracasso",
      descricao: "A resposta é negativa ou a ação falha completamente.",
      cor: "text-red-700"
    },
    {
      d6: 2,
      resultado: "NÃO / Fracasso", 
      descricao: "A resposta é negativa ou a ação falha.",
      cor: "text-red-600"
    },
    {
      d6: 3,
      resultado: "NÃO / Fracasso",
      descricao: "A resposta é negativa ou a ação falha parcialmente.",
      cor: "text-red-500"
    },
    {
      d6: 4,
      resultado: "SIM / Sucesso",
      descricao: "A resposta é positiva ou a ação tem sucesso parcial.",
      cor: "text-green-500"
    },
    {
      d6: 5,
      resultado: "SIM / Sucesso",
      descricao: "A resposta é positiva ou a ação tem sucesso.",
      cor: "text-green-600"
    },
    {
      d6: 6,
      resultado: "SIM / Sucesso",
      descricao: "A resposta é positiva ou a ação tem sucesso completo.",
      cor: "text-green-700"
    }
  ],
  trama: [
    {
      d6: 1,
      aconteceu: "Engrenagem do tempo parou.",
      precisa: "Encontrar a chave-mestra.",
      senao: "O futuro será destruído."
    },
    {
      d6: 2,
      aconteceu: "Rebelião dos autômatos começou.",
      precisa: "Desativar o líder mecânico.",
      senao: "A cidade cairá."
    },
    {
      d6: 3,
      aconteceu: "Gás alquímico envenenou a cidade.",
      precisa: "Criar o antídoto.",
      senao: "Todos morrerão."
    },
    {
      d6: 4,
      aconteceu: "Dirigível real foi sequestrado.",
      precisa: "Resgatar a realeza.",
      senao: "Guerra será declarada."
    },
    {
      d6: 5,
      aconteceu: "Artefato antigo foi roubado.",
      precisa: "Recuperar o artefato.",
      senao: "Magia desaparecerá para sempre."
    },
    {
      d6: 6,
      aconteceu: "Inventor famoso desapareceu.",
      precisa: "Descobrir a verdade.",
      senao: "O vilão vencerá."
    }
  ],
  personagem: [
    {
      d6: 1,
      descricao: "**Engenheiro de Campo:** Conserta máquinas com sucata e intuição."
    },
    {
      d6: 2,
      descricao: "**Agente da Coroa:** Usa gadgets e disfarces para se infiltrar."
    },
    {
      d6: 3,
      descricao: "**Mago Tecnológico:** Encanta artefatos com runas e circuitos."
    },
    {
      d6: 4,
      descricao: "**Piloto de Dirigível:** Manobra com ousadia e precisão nos céus."
    },
    {
      d6: 5,
      descricao: "**Investigador Alquímico:** Analisa pistas com compostos e lógica."
    },
    {
      d6: 6,
      descricao: "**Forja-da-alma:** Cria itens com metais imbuídos de alma."
    }
  ],
  cena: [
    {
      d6: 1,
      lugar: "Oficina de um inventor.",
      personagem: "Um aristocrata endividado.",
      evento: "Uma explosão de vapor."
    },
    {
      d6: 2,
      lugar: "Dirigível pirata nos céus.",
      personagem: "Autômato com consciência.",
      evento: "Negociação secreta ocorre."
    },
    {
      d6: 3,
      lugar: "Catacumbas sob a cidade.",
      personagem: "Líder sindicalista revolucionário.",
      evento: "Ritual alquímico dá errado."
    },
    {
      d6: 4,
      lugar: "Loja de alquimia e engrenagens.",
      personagem: "Oráculo mecânico quebrado.",
      evento: "Perseguição de carruagens a vapor."
    },
    {
      d6: 5,
      lugar: "Sala de motores de um trem.",
      personagem: "Garota de rua com rádio.",
      evento: "Discurso proibido começa."
    },
    {
      d6: 6,
      lugar: "Biblioteca com livros-máquina.",
      personagem: "Anão ferreiro de aço-vapor.",
      evento: "Máquina antiga se ativa."
    }
  ],
  bancoIdeias: [
    {
      d6: 1,
      assunto: "Conspiração industrial",
      acao: "Calibrar",
      coisa: "Engrenagem",
      item: "Lunetas de visão noturna",
      arma: "Revólver de percussão",
      qualidade: "Oxidado"
    },
    {
      d6: 2,
      assunto: "Magia perdida",
      acao: "Sobrecarregar",
      coisa: "Manivela",
      item: "Kit de first-aid a vapor",
      arma: "Bazuca a ar comprimido",
      qualidade: "Complexo"
    },
    {
      d6: 3,
      assunto: "Direitos dos autômatos",
      acao: "Infiltrar",
      coisa: "Tubo de vácuo",
      item: "Grampo de energia",
      arma: "Bastão elétrico",
      qualidade: "Preciso"
    },
    {
      d6: 4,
      assunto: "Fonte de energia alternativa",
      acao: "Decifrar",
      coisa: "Bússola anômala",
      item: "Bomba de fumaça",
      arma: "Faca com mola",
      qualidade: "Instável"
    },
    {
      d6: 5,
      assunto: "Linhagem real secreta",
      acao: "Sabotar",
      coisa: "Esquema técnico",
      item: "Pergaminho tradutor",
      arma: "Rapier de energia",
      qualidade: "Elegante"
    },
    {
      d6: 6,
      assunto: "Ameaça do submundo",
      acao: "Negociar",
      coisa: "Frasco de mercúrio",
      item: "Isqueiro a óleo",
      arma: "Chicote de aço",
      qualidade: "Proibido"
    }
  ]
}

const playerTips = [
  {
    category: "Para Iniciantes",
    tips: [
      "Crie um personagem com uma motivação clara - o que o impulsiona neste mundo steampunk?",
      "Não tenha medo de fazer perguntas ao Mestre sobre o mundo de DOMINUS",
      "Trabalhe em equipe com os outros jogadores - combinações de habilidades são poderosas",
      "Use o ambiente a seu favor - engrenagens, vapor e tecnologia estão por toda parte"
    ]
  },
  {
    category: "Durante a Campanha",
    tips: [
      "Mantenha um diário de missão para acompanhar pistas e personagens",
      "Construa relacionamentos com NPCs - eles podem se tornar aliados valiosos",
      "Explore as consequências de suas ações - o mundo reage às suas escolhas",
      "Equilibre risco e recompensa - nem toda situação exige uma solução violenta"
    ]
  },
  {
    category: "Avançado",
    tips: [
      "Desenvolva as habilidades únicas do seu arquétipo de personagem",
      "Crie equipamentos personalizados usando o Banco de Ideias",
      "Planeje estratégias de longo prazo para objetivos da campanha",
      "Influencie o mundo através de suas ações - você pode mudar o curso da história"
    ]
  }
]

const DiceIcon = ({ value, size = 24 }: { value: number; size?: number }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
  const Icon = icons[value - 1]
  return <Icon size={size} />
}

export default function Home() {
  const [isRolling, setIsRolling] = useState(false)
  const [currentDice, setCurrentDice] = useState(1)
  const [rollHistory, setRollHistory] = useState<RollResult[]>([])
  const [selectedTable, setSelectedTable] = useState<string>('oraculo')
  const [currentResult, setCurrentResult] = useState<any>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false)

  const rollDice = () => {
    if (isRolling) return
    
    setIsRolling(true)
    setCurrentResult(null)
    
    let rollCount = 0
    const rollInterval = setInterval(() => {
      setCurrentDice(Math.floor(Math.random() * 6) + 1)
      rollCount++
      
      if (rollCount > 10) {
        clearInterval(rollInterval)
        const finalResult = Math.floor(Math.random() * 6) + 1
        setCurrentDice(finalResult)
        setIsRolling(false)
        
        const tableData = rpgTables[selectedTable as keyof typeof rpgTables][finalResult - 1]
        setCurrentResult(tableData)
        
        // Se rolou um personagem, abrir o card automaticamente
        if (selectedTable === 'personagem') {
          setTimeout(() => {
            openCharacterCard(finalResult)
          }, 500)
        }
        
        const newRoll: RollResult = {
          table: selectedTable,
          result: finalResult,
          data: tableData
        }
        
        setRollHistory(prev => [newRoll, ...prev].slice(0, 5))
      }
    }, 100)
  }

  const getTableName = (table: string) => {
    const names: { [key: string]: string } = {
      oraculo: 'Oráculo',
      trama: 'Trama',
      personagem: 'Personagem',
      cena: 'Cena',
      bancoIdeias: 'Banco de Ideias'
    }
    return names[table] || table
  }

  const openCharacterCard = (characterId: number) => {
    const character = {
      id: characterId,
      name: rpgTables.personagem[characterId - 1].descricao.split(':')[0].replace('**', ''),
      description: rpgTables.personagem[characterId - 1].descricao.split(':')[1].trim()
    }
    setSelectedCharacter(character)
    setIsCharacterModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header Steampunk Mobile-First */}
      <div className="border-b-4 border-amber-800 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <img
                  src="/rpg-logo.png"
                  alt="DOMINUS RPG Logo"
                  className="w-full h-full object-contain rounded-full border-2 border-amber-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300 animate-spin-slow" />
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-100">DOMINUS RPG</h1>
                <p className="text-amber-300 text-xs sm:text-sm">Sistema de Fantasia Steampunk</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span className="text-amber-200 text-xs sm:text-sm">Era Vitoriana Alternativa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Introdução Mobile-First */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-b-2 border-amber-300">
        <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-3">O que é o DOMINUS RPG?</h2>
                <div className="space-y-3 text-amber-800">
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold">DOMINUS</span> é um sistema de RPG sem mestre. Este é um DOMINUS de fantasia steampunk ambientado em uma Era Vitoriana alternativa onde a magia antiga coexiste com tecnologia a vapor. Neste mundo, engrenagens gigantes movem cidades flutuantes, 
                    autômatos ganham consciência e alquimistas criam poções místicas em laboratórios movidos a carvão.
                  </p>
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold text-amber-900">Sem mestre?</span> Exato! Em DOMINUS, os próprios jogadores controlam a narrativa usando as tabelas 
                    intuitivas do sistema. Role o dado para gerar tramas, personagens, cenas e elementos surpresa. 
                    Todas as regras essenciais estão integradas nas ferramentas que você vê nesta página - 
                    <span className="italic">"você encontrará todas as regras do Dominus no verso desta folha."</span>
                  </p>
                  <p className="leading-relaxed text-sm sm:text-base">
                    Como aventureiro neste universo, você explorará conspirações industriais, negociará com facções místicas, 
                    pilotará dirigíveis piratas e descobrirá segredos que podem mudar o curso da história. 
                    O sistema usa mecânicas simples baseadas em D6 para gerar histórias dinâmicas e colaborativas.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <Badge variant="secondary" className="bg-amber-200 text-amber-900 border-amber-400 text-xs sm:text-sm">
                      ⚙️ Steampunk
                    </Badge>
                    <Badge variant="secondary" className="bg-amber-200 text-amber-900 border-amber-400 text-xs sm:text-sm">
                      🔮 Magia Tecnológica
                    </Badge>
                    <Badge variant="secondary" className="bg-amber-200 text-amber-900 border-amber-400 text-xs sm:text-sm">
                      🎭 Aventura e Mistério
                    </Badge>
                    <Badge variant="secondary" className="bg-amber-200 text-amber-900 border-amber-400 text-xs sm:text-sm">
                      🎲 D6 System
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-200 text-blue-900 border-blue-400 text-xs sm:text-sm">
                      🎯 Sem Mestre
                    </Badge>
                    <Badge variant="secondary" className="bg-green-200 text-green-900 border-green-400 text-xs sm:text-sm">
                      👥 Cooperativo
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-200 text-purple-900 border-purple-400 text-xs sm:text-sm">
                      🔮 Modo Oráculo
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Painel de Dados - Mobile First */}
          <div className="xl:col-span-1">
            <Card className="border-2 border-amber-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-amber-800 to-orange-800 text-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Sparkles className="w-5 h-5" />
                  Dado de Destino
                </CardTitle>
                <CardDescription className="text-amber-200 text-sm">
                  Role o D6 para descobrir seu futuro
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  {/* Dado Animado Mobile */}
                  <div className={`relative ${isRolling ? 'animate-bounce' : ''}`}>
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-800 rounded-lg flex items-center justify-center shadow-lg ${isRolling ? 'animate-spin' : ''}`}>
                      <DiceIcon value={currentDice} size={40} className="text-amber-800 sm:size-12" />
                    </div>
                    {isRolling && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-amber-600 rounded-lg animate-ping" />
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="text-xl sm:text-2xl font-bold px-3 py-2 sm:px-4 border-2 border-amber-800">
                    {currentDice}
                  </Badge>
                  
                  <Button 
                    onClick={rollDice}
                    disabled={isRolling}
                    className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold py-3 text-base sm:text-lg min-h-[44px]"
                  >
                    {isRolling ? 'Rolando...' : 'Rolar Dado'}
                  </Button>
                </div>
                
                <Separator className="my-4 sm:my-6" />
                
                {/* Histórico de Rolagens Mobile */}
                <div>
                  <h3 className="font-semibold text-amber-900 mb-3 text-sm sm:text-base">Histórico Recente</h3>
                  <ScrollArea className="h-24 sm:h-32">
                    <div className="space-y-2">
                      {rollHistory.length === 0 ? (
                        <p className="text-gray-500 text-xs sm:text-sm">Nenhuma rolagem ainda</p>
                      ) : (
                        rollHistory.map((roll, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                            <DiceIcon value={roll.result} size={14} className="sm:size-4" />
                            <span className="font-medium">{roll.result}</span>
                            <span className="text-gray-600">- {getTableName(roll.table)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabelas do RPG - Mobile First */}
          <div className="xl:col-span-2">
            <Card className="border-2 border-amber-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-amber-800 to-orange-800 text-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-5 h-5" />
                  Tabelas do DOMINUS
                </CardTitle>
                <CardDescription className="text-amber-200 text-sm">
                  Escolha uma tabela e role o dado para gerar elementos da sua aventura - incluindo o Modo Oráculo para respostas diretas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <Tabs value={selectedTable} onValueChange={setSelectedTable} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 bg-amber-100 h-auto min-h-[44px]">
                    <TabsTrigger value="oraculo" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2">
                      <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="hidden sm:inline">Oráculo</span>
                      <span className="sm:hidden">🔮</span>
                    </TabsTrigger>
                    <TabsTrigger value="trama" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2">
                      <span className="hidden sm:inline">Trama</span>
                      <span className="sm:hidden">📖</span>
                    </TabsTrigger>
                    <TabsTrigger value="personagem" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2">
                      <span className="hidden sm:inline">Personagem</span>
                      <span className="sm:hidden">👤</span>
                    </TabsTrigger>
                    <TabsTrigger value="cena" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2 hidden sm:flex">
                      Cena
                    </TabsTrigger>
                    <TabsTrigger value="bancoIdeias" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2 hidden sm:flex">
                      Banco
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="oraculo" className="mt-4 sm:mt-6">
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-2">Modo Oráculo</h3>
                      <p className="text-amber-700 text-sm sm:text-base">Role o dado para receber respostas diretas: 1-3 = NÃO/Fracasso, 4-6 = SIM/Sucesso</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">Resultado</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.oraculo.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <DiceIcon value={item.d6} size={16} className="text-amber-700 sm:size-5" />
                                  <span className="font-medium">{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 font-bold ${item.cor}`}>
                                <div className="flex flex-col sm:block">
                                  <span>{item.resultado.split(' / ')[0]}</span>
                                  <span className="text-xs sm:text-sm sm:inline">{item.resultado.split(' / ')[1]}</span>
                                </div>
                              </td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-gray-700 hidden sm:table-cell">
                                {item.descricao}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Mobile Description */}
                      <div className="sm:hidden mt-4 space-y-2">
                        {rpgTables.oraculo.map((item) => (
                          currentResult?.d6 === item.d6 && (
                            <div key={`mobile-${item.d6}`} className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                              <p className="text-xs text-gray-700">{item.descricao}</p>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trama" className="mt-4 sm:mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">Aconteceu...</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Precisa...</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Senão...</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.trama.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <DiceIcon value={item.d6} size={16} className="text-amber-700 sm:size-4" />
                                  <span className="font-medium">{item.d6}</span>
                                </div>
                              </td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">{item.aconteceu}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.precisa}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.senao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Mobile Details */}
                      <div className="sm:hidden mt-4 space-y-2">
                        {rpgTables.trama.map((item) => (
                          currentResult?.d6 === item.d6 && (
                            <div key={`mobile-${item.d6}`} className="bg-amber-50 p-3 rounded-lg border border-amber-200 space-y-2">
                              <div>
                                <span className="font-semibold text-amber-900">Precisa:</span> {item.precisa}
                              </div>
                              <div>
                                <span className="font-semibold text-amber-900">Senão:</span> {item.senao}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personagem" className="mt-4 sm:mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.personagem.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 transition-colors duration-200 ${
                                currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''
                              } ${
                                selectedCharacter?.id === item.d6 ? 'ring-2 ring-amber-600 ring-inset' : ''
                              }`}
                            >
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <DiceIcon value={item.d6} size={16} className="text-amber-700 sm:size-4" />
                                  <span className="font-medium">{item.d6}</span>
                                </div>
                              </td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <span dangerouslySetInnerHTML={{ __html: item.descricao }} />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openCharacterCard(item.d6)}
                                    className={`px-2 py-1 text-xs transition-all duration-200 hover:scale-105 min-h-[32px] ${
                                      selectedCharacter?.id === item.d6 
                                        ? 'bg-amber-600 text-white border-amber-700' 
                                        : 'bg-amber-100 hover:bg-amber-200 border-amber-400 hover:border-amber-600 animate-glow'
                                    }`}
                                  >
                                    {selectedCharacter?.id === item.d6 ? 'Card Aberto' : 'Ver Card'}
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cena" className="mt-4 sm:mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">Lugar</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Personagem (NPC)</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Evento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.cena.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <DiceIcon value={item.d6} size={16} className="text-amber-700 sm:size-4" />
                                  <span className="font-medium">{item.d6}</span>
                                </div>
                              </td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">{item.lugar}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.personagem}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.evento}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Mobile Details */}
                      <div className="sm:hidden mt-4 space-y-2">
                        {rpgTables.cena.map((item) => (
                          currentResult?.d6 === item.d6 && (
                            <div key={`mobile-${item.d6}`} className="bg-amber-50 p-3 rounded-lg border border-amber-200 space-y-2">
                              <div>
                                <span className="font-semibold text-amber-900">Personagem:</span> {item.personagem}
                              </div>
                              <div>
                                <span className="font-semibold text-amber-900">Evento:</span> {item.evento}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bancoIdeias" className="mt-4 sm:mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left">Assunto</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Ação</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Coisa</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Item</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Arma</th>
                            <th className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 text-left hidden sm:table-cell">Qualidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.bancoIdeias.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <DiceIcon value={item.d6} size={16} className="text-amber-700 sm:size-4" />
                                  <span className="font-medium">{item.d6}</span>
                                </div>
                              </td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2">{item.assunto}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.acao}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.coisa}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.item}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.arma}</td>
                              <td className="border border-amber-800 px-2 py-2 sm:px-4 sm:py-2 hidden sm:table-cell">{item.qualidade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Mobile Details */}
                      <div className="sm:hidden mt-4 space-y-2">
                        {rpgTables.bancoIdeias.map((item) => (
                          currentResult?.d6 === item.d6 && (
                            <div key={`mobile-${item.d6}`} className="bg-amber-50 p-3 rounded-lg border border-amber-200 space-y-2">
                              <div>
                                <span className="font-semibold text-amber-900">Ação:</span> {item.acao}
                              </div>
                              <div>
                                <span className="font-semibold text-amber-900">Coisa:</span> {item.coisa}
                              </div>
                              <div>
                                <span className="font-semibold text-amber-900">Item:</span> {item.item}
                              </div>
                              <div>
                                <span className="font-semibold text-amber-900">Arma:</span> {item.arma}
                              </div>
                              <div>
                                <span className="font-semibold text-amber-900">Qualidade:</span> {item.qualidade}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regras do Jogo */}
        <div className="mt-8">
          <Card className="border-2 border-amber-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-800 to-orange-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Regras do DOMINUS
              </CardTitle>
              <CardDescription className="text-amber-200">
                Sistema completo para jogar suas aventuras steampunk
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Regra 1 */}
                <Card className="border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      Preparação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Escolha (ou role) um Arquétipo na tabela e dê um nome para seu personagem. Depois role um dado para cada uma das três colunas na tabela de Trama.
                    </p>
                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
                      <p className="text-xs font-semibold text-amber-800 mb-1">📋 Passos:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Escolha seu Arquétipo</li>
                        <li>• Dê um nome ao personagem</li>
                        <li>• Role 3x na tabela Trama</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 2 */}
                <Card className="border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      História
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Para começar a sua história, escolha (ou role) um Lugar na tabela de Cenas. Sempre que entrar em uma Cena, role um dado.
                    </p>
                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
                      <p className="text-xs font-semibold text-amber-800 mb-1">🎲 Resultados:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• <strong>3 ou menos:</strong> Role um Personagem</li>
                        <li>• <strong>4 ou mais:</strong> Role um Evento</li>
                        <li>• Vá para nova cena quando resolver conflitos</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 3 */}
                <Card className="border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      Desafio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Sempre que seu personagem tentar fazer algo que possa dar errado, você tem um Desafio: role um dado.
                    </p>
                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
                      <p className="text-xs font-semibold text-amber-800 mb-1">⚡ Resultados:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• <strong>4 ou mais:</strong> Sucesso!</li>
                        <li>• <strong>Vantagem:</strong> Role 2, escolha o maior</li>
                        <li>• <strong>Desvantagem:</strong> Role 2, escolha o menor</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 4 */}
                <Card className="border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      Dilema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Sempre que tiver uma dúvida cuja resposta não seja óbvia, determine duas opções possíveis e role um dado.
                    </p>
                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
                      <p className="text-xs font-semibold text-amber-800 mb-1">⚖️ Resultados:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• <strong>3 ou menos:</strong> Primeira opção</li>
                        <li>• <strong>4 ou mais:</strong> Segunda opção</li>
                        <li>• Ex: sim/não, esquerda/direita, A/B</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 5 */}
                <Card className="border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        5
                      </div>
                      Banco de Ideias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      Sempre que precisar elaborar melhor um Lugar, Personagem ou Evento, role no Banco de Ideias.
                    </p>
                    <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
                      <p className="text-xs font-semibold text-amber-800 mb-1">💡 Como usar:</p>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Role no Banco de Ideias</li>
                        <li>• Interprete qualquer coluna</li>
                        <li>• Adapte ao seu cenário</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumo Rápido */}
                <Card className="border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50 lg:col-span-2 xl:col-span-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Resumo Rápido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                        <span className="text-gray-700"><strong>4+ = Sucesso</strong> em desafios</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                          ?
                        </div>
                        <span className="text-gray-700"><strong>3- = Opção 1</strong> em dilemas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                          🎲
                        </div>
                        <span className="text-gray-700"><strong>4+ = Opção 2</strong> em dilemas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                          🎯
                        </div>
                        <span className="text-gray-700"><strong>3- = Personagem</strong> em cenas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                          ⚡
                        </div>
                        <span className="text-gray-700"><strong>4+ = Evento</strong> em cenas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dicas para Jogadores */}
        <div className="mt-8">
          <Card className="border-2 border-amber-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-amber-800 to-orange-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Dicas para Aventureiros
              </CardTitle>
              <CardDescription className="text-amber-200">
                Orientações para iniciar e prosperar em suas campanhas DOMINUS
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {playerTips.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-amber-900">{category.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <Alert key={tipIndex} className="border-amber-200 bg-amber-50">
                          <AlertDescription className="text-sm text-gray-700">
                            {tip}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-lg border-2 border-amber-300">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Como Começar Sua Aventura
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="font-semibold text-amber-800">1. Escolha Seu Arquétipo</p>
                    <p className="text-gray-700">Use a tabela Personagem para definir quem você é neste mundo steampunk</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-amber-800">2. Entenda a Trama</p>
                    <p className="text-gray-700">Role na tabela Trama para descobrir o conflito principal</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-amber-800">3. Explore o Cenário</p>
                    <p className="text-gray-700">Use a tabela Cena para criar locais memoráveis</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-amber-800">4. Inspire-se</p>
                    <p className="text-gray-700">Consulte o Banco de Ideias para elementos criativos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modal do Personagem */}
      {selectedCharacter && (
        <CharacterCard
          character={selectedCharacter}
          isOpen={isCharacterModalOpen}
          onClose={() => setIsCharacterModalOpen(false)}
        />
      )}
      
      {/* Footer - Licenciamento */}
      <footer className="border-t-2 border-amber-800 bg-gradient-to-r from-amber-900 to-orange-900 text-white mt-12 hover:from-amber-800 hover:to-orange-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Símbolo Creative Commons */}
              <div className="flex items-center gap-1">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M8.5 12c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm4.5 0c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5z"/>
                </svg>
                <span className="text-sm font-medium">CC BY 4.0</span>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-amber-100 text-sm leading-relaxed">
                Esta obra foi criada pelo coletivo <strong>"Iniciativa Dominus"</strong> e está licenciada com uma<br />
                <a 
                  href="https://creativecommons.org/licenses/by/4.0/deed.pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-200 hover:text-amber-100 underline transition-colors duration-200"
                >
                  Licença Creative Commons Atribuição 4.0 Internacional
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}