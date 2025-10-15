'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, BookOpen, Users, Map, Lightbulb, Settings, Clock, Zap } from 'lucide-react'
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
  const [selectedTable, setSelectedTable] = useState<string>('trama')
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
      {/* Header Steampunk */}
      <div className="border-b-4 border-amber-800 bg-gradient-to-r from-amber-900 to-orange-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <img
                  src="/rpg-logo.png"
                  alt="DOMINUS RPG Logo"
                  className="w-full h-full object-contain rounded-full border-2 border-amber-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-8 h-8 text-amber-300 animate-spin-slow" />
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-amber-100">DOMINUS RPG</h1>
                <p className="text-amber-300 text-sm">Sistema de Fantasia Steampunk</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-300" />
              <span className="text-amber-200 text-sm">Era Vitoriana Alternativa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Painel de Dados */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-amber-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-amber-800 to-orange-800 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Dado de Destino
                </CardTitle>
                <CardDescription className="text-amber-200">
                  Role o D6 para descobrir seu futuro
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-6">
                  {/* Dado Animado */}
                  <div className={`relative ${isRolling ? 'animate-bounce' : ''}`}>
                    <div className={`w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 border-4 border-amber-800 rounded-lg flex items-center justify-center shadow-lg ${isRolling ? 'animate-spin' : ''}`}>
                      <DiceIcon value={currentDice} size={48} className="text-amber-800" />
                    </div>
                    {isRolling && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 border-4 border-amber-600 rounded-lg animate-ping" />
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="text-2xl font-bold px-4 py-2 border-2 border-amber-800">
                    {currentDice}
                  </Badge>
                  
                  <Button 
                    onClick={rollDice}
                    disabled={isRolling}
                    className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white font-bold py-3"
                  >
                    {isRolling ? 'Rolando...' : 'Rolar Dado'}
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                {/* Histórico de Rolagens */}
                <div>
                  <h3 className="font-semibold text-amber-900 mb-3">Histórico Recente</h3>
                  <ScrollArea className="h-32">
                    <div className="space-y-2">
                      {rollHistory.length === 0 ? (
                        <p className="text-gray-500 text-sm">Nenhuma rolagem ainda</p>
                      ) : (
                        rollHistory.map((roll, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <DiceIcon value={roll.result} size={16} />
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

          {/* Tabelas do RPG */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-amber-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-amber-800 to-orange-800 text-white">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Tabelas do DOMINUS
                </CardTitle>
                <CardDescription className="text-amber-200">
                  Escolha uma tabela e role o dado para gerar elementos da sua aventura
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={selectedTable} onValueChange={setSelectedTable} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-amber-100">
                    <TabsTrigger value="trama" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                      Trama
                    </TabsTrigger>
                    <TabsTrigger value="personagem" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                      Personagem
                    </TabsTrigger>
                    <TabsTrigger value="cena" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                      Cena
                    </TabsTrigger>
                    <TabsTrigger value="bancoIdeias" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">
                      Banco
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="trama" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-4 py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Aconteceu...</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Precisa...</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Senão...</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.trama.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} />
                                  {item.d6}
                                </div>
                              </td>
                              <td className="border border-amber-800 px-4 py-2">{item.aconteceu}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.precisa}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.senao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personagem" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-4 py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Descrição</th>
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
                              <td className="border border-amber-800 px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} />
                                  {item.d6}
                                </div>
                              </td>
                              <td className="border border-amber-800 px-4 py-2">
                                <div className="flex items-center justify-between">
                                  <span dangerouslySetInnerHTML={{ __html: item.descricao }} />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openCharacterCard(item.d6)}
                                    className={`ml-2 px-2 py-1 text-xs transition-all duration-200 hover:scale-105 ${
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
                  
                  <TabsContent value="cena" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-4 py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Lugar</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Personagem (NPC)</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Evento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.cena.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} />
                                  {item.d6}
                                </div>
                              </td>
                              <td className="border border-amber-800 px-4 py-2">{item.lugar}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.personagem}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.evento}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bancoIdeias" className="mt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-amber-800 px-4 py-2 text-left">D6</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Assunto</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Ação</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Coisa</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Item</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Arma</th>
                            <th className="border border-amber-800 px-4 py-2 text-left">Qualidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rpgTables.bancoIdeias.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`hover:bg-amber-50 ${currentResult?.d6 === item.d6 ? 'bg-yellow-100 font-semibold' : ''}`}
                            >
                              <td className="border border-amber-800 px-4 py-2">
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} />
                                  {item.d6}
                                </div>
                              </td>
                              <td className="border border-amber-800 px-4 py-2">{item.assunto}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.acao}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.coisa}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.item}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.arma}</td>
                              <td className="border border-amber-800 px-4 py-2">{item.qualidade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
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
    </div>
  )
}