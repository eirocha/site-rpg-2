'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, BookOpen, Users, Map, Lightbulb, Settings, Clock, Zap, HelpCircle, Skull, Shield, Crosshair, Home } from 'lucide-react'
import CharacterCard from '@/components/ZombieCharacterCard'
import { useTheme } from '@/contexts/ThemeContext'
import '@/styles/animations.css'
import '@/styles/scrollbar.css'

interface TableData {
  d6: number
  content: string | string[]
}

interface RollResult {
  table: string
  result: number
  data: any
}

const zombieRpgTables = {
  oraculo: [
    {
      d6: 1,
      resultado: "NÃO / Perigo",
      descricao: "A resposta é negativa ou algo perigoso acontece.",
      cor: "text-red-700"
    },
    {
      d6: 2,
      resultado: "NÃO / Risco", 
      descricao: "A resposta é negativa ou há risco iminente.",
      cor: "text-red-600"
    },
    {
      d6: 3,
      resultado: "TALVEZ / Cautela",
      descricao: "A resposta é incerta, proceda com cuidado.",
      cor: "text-orange-600"
    },
    {
      d6: 4,
      resultado: "SIM / Oportunidade",
      descricao: "A resposta é positiva ou há uma oportunidade.",
      cor: "text-green-600"
    },
    {
      d6: 5,
      resultado: "SIM / Vantagem",
      descricao: "A resposta é positiva ou você ganha vantagem.",
      cor: "text-green-700"
    },
    {
      d6: 6,
      resultado: "SIM / Sorte",
      descricao: "A resposta é positiva ou você tem sorte excepcional.",
      cor: "text-green-800"
    }
  ],
  trama: [
    {
      d6: 1,
      aconteceu: "O horizonte está coberto de nuvens de cinzas.",
      precisa: "Encontrar uma fonte de água potável.",
      senao: "A sede enfraquecerá o grupo."
    },
    {
      d6: 2,
      aconteceu: "Transmissão de rádio misteriosa detectada.",
      precisa: "Localizar a fonte da transmissão.",
      senao: "A esperança se perderá."
    },
    {
      d6: 3,
      aconteceu: "Horda de infectados se aproxima.",
      precisa: "Encontrar abrigo seguro até amanhã.",
      senao: "O grupo será dizimado."
    },
    {
      d6: 4,
      aconteceu: "Suprimentos médicos estão acabando.",
      precisa: "Invadir hospital abandonado.",
      senao: "Os feridos não sobreviverão."
    },
    {
      d6: 5,
      aconteceu: "Comunidade isolada foi descoberta.",
      precisa: "Estabelecer contato diplomático.",
      senao: "Inimigos poderosos surgirão."
    },
    {
      d6: 6,
      aconteceu: "Sintomas de infecção aparecem em um membro.",
      precisa: "Tomar decisão difícil sobre o destino.",
      senao: "Todos serão contaminados."
    }
  ],
  personagem: [
    {
      d6: 1,
      descricao: "**Sobrevivente Militar:** Estrategista experiente em combate tático."
    },
    {
      d6: 2,
      descricao: "**Médico de Campo:** Conhece tratamentos improvisados e primeiros socorros."
    },
    {
      d6: 3,
      descricao: "**Ladrão de Suprimentos:** Especialista em infiltração e obtenção de recursos."
    },
    {
      d6: 4,
      descricao: "**Mecânico Refugiado:** Conserta veículos e equipamentos com sucata."
    },
    {
      d6: 5,
      descricao: "**Caçador de Infectados:** Especialista em eliminação silenciosa e patrulha."
    },
    {
      d6: 6,
      descricao: "**Líder Comunitário:** Mantém a moral e organiza o grupo em crises."
    }
  ],
  cena: [
    {
      d6: 1,
      lugar: "Hospital abandonado e sangrento.",
      personagem: "Médico traumatizado escondido.",
      evento: "Gritos vêm do porão."
    },
    {
      d6: 2,
      lugar: "Supermercado saqueado e escuro.",
      personagem: "Criança perdida e assustada.",
      evento: "Portas se fecham sozinhas."
    },
    {
      d6: 3,
      lugar: "Túnel do metrô inundado.",
      personagem: "Refugiado com segredo sombrio.",
      evento: "Barulhos de arrastar se aproximam."
    },
    {
      d6: 4,
      lugar: "Prédio de apartamentos em ruínas.",
      personagem: "Sobrevivente idoso e sábio.",
      evento: "Helicóptero passa sobrevoando."
    },
    {
      d6: 5,
      lugar: "Posto de gasolina explodido.",
      personagem: "Bando hostil de sobreviventes.",
      evento: "Fumaça tóxica começa a subir."
    },
    {
      d6: 6,
      lugar: "Laboratório de pesquisa secreto.",
      personagem: "Cientista com cura parcial.",
      evento: "Sistema de segurança se ativa."
    }
  ],
  bancoIdeias: [
    {
      d6: 1,
      assunto: "Origem do surto",
      acao: "Investigar",
      coisa: "Amostra de sangue",
      item: "Rádio de longa distância",
      arma: "Facão de combate",
      qualidade: "Contaminado"
    },
    {
      d6: 2,
      assunto: "Comunidade remota",
      acao: "Proteger",
      coisa: "Diário de pesquisa",
      item: "Máscara de gás",
      arma: "Arco e flechas",
      qualidade: "Escondido"
    },
    {
      d6: 3,
      assunto: "Vacina experimental",
      acao: "Transportar",
      coisa: "Chave de segurança",
      item: "Gerador portátil",
      arma: "Lança-chamas",
      qualidade: "Instável"
    },
    {
      d6: 4,
      assunto: "Ninho de infectados",
      acao: "Destruir",
      coisa: "Mapa subterrâneo",
      item: "Silenciador caseiro",
      arma: "Espada de metal",
      qualidade: "Perigoso"
    },
    {
      d6: 5,
      assunto: "Refúgio seguro",
      acao: "Construir",
      coisa: "Planta de construção",
      item: "Kit de purificação",
      arma: "Besta pesada",
      qualidade: "Fortificado"
    },
    {
      d6: 6,
      assunto: "Transmissão de resgate",
      acao: "Decifrar",
      coisa: "Frasco de antiviral",
      item: "Bússola especial",
      arma: "Martelo de demolição",
      qualidade: "Urgente"
    }
  ]
}

const playerTips = [
  {
    category: "Para Iniciantes",
    tips: [
      "Munição é recurso escasso - use armas brancas sempre que possível",
      "Confiança é moeda de sobrevivência, mas desconfiança mantém você vivo",
      "O barulho atrai infectados - silêncio é sua melhor defesa",
      "Cada ferida pode ser a última - trate imediatamente qualquer lesão"
    ]
  },
  {
    category: "Durante a Campanha",
    tips: [
      "Mantenha registro dos recursos - comida, água, munição e medicamentos",
      "Conheça os sinais de infecção - tempo é crucial",
      "Explore verticalmente - telhados oferecem vantagem tática",
      "Equilibre risco e recompensa - às vezes fugir é a melhor opção"
    ]
  },
  {
    category: "Avançado",
    tips: [
      "Estude padrões das hordas - elas têm comportamento previsível",
      "Crie rotas de fuga múltiplas para cada local",
      "Desenvolva especialidade no grupo - cada um tem seu papel",
      "Mantenha sua humanidade - decisões difíceis definem seu caráter"
    ]
  }
]

const DiceIcon = ({ value, size = 24 }: { value: number; size?: number }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
  const Icon = icons[value - 1]
  return <Icon size={size} />
}

export default function ZombieRPG() {
  const { setTheme } = useTheme()
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
        
        const tableData = zombieRpgTables[selectedTable as keyof typeof zombieRpgTables][finalResult - 1]
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
      name: zombieRpgTables.personagem[characterId - 1].descricao.split(':')[0].replace('**', ''),
      description: zombieRpgTables.personagem[characterId - 1].descricao.split(':')[1].trim()
    }
    setSelectedCharacter(character)
    setIsCharacterModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Apocalíptico Mobile-First */}
      <div className="border-b-4 border-red-800 bg-gradient-to-r from-gray-900 to-red-900 text-white">
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <div className="w-full h-full bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                  <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 animate-pulse" />
                <Crosshair className="w-4 h-4 sm:w-6 sm:h-6 text-orange-300" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-red-100">DOMINUS ZOMBIE</h1>
                <p className="text-red-300 text-sm">Sistema de Sobrevivência Apocalíptica</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setTheme('home')}
                variant="outline"
                size="sm"
                className="bg-gray-700 hover:bg-gray-600 text-white border-gray-500 min-h-[44px] px-3 py-2"
              >
                <Home className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Início</span>
                <span className="sm:hidden">🏠</span>
              </Button>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-300" />
              <span className="text-red-200 text-sm">Dia ? do Colapso</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Introdução Mobile-First */}
      <div className="bg-gradient-to-r from-gray-800 to-red-900 border-b-2 border-red-600">
        <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <Skull className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-red-100 mb-3">O que é o DOMINUS ZOMBIE?</h2>
                <div className="space-y-3 text-red-200">
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold">DOMINUS ZOMBIE</span> é um sistema de RPG sem mestre. Este é um DOMINUS de sobrevivência apocalíptica ambientado em um mundo devastado por um surto zumbi. A civilidade ruiu, os mortos caminham entre os vivos, e cada dia é uma luta pela sobrevivência.
                  </p>
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold text-red-100">Sem mestre?</span> Exato! Em DOMINUS, os próprios jogadores controlam a narrativa usando as tabelas 
                    intuitivas do sistema. Role o dado para gerar tramas, personagens, cenas e elementos surpresa. 
                    Todas as regras essenciais estão integradas nas ferramentas que você vê nesta página - 
                    <span className="italic">"você encontrará todas as regras do Dominus no verso desta folha."</span>
                  </p>
                  <p className="leading-relaxed text-sm sm:text-base">
                    Como sobrevivente neste mundo em ruínas, você enfrentará hordas de infectados, encontrará outros sobreviventes desesperados, 
                    buscará recursos escassos e tomará decisões impossíveis. 
                    O sistema usa mecânicas simples baseadas em D6 para gerar histórias dinâmicas e colaborativas de horror e sobrevivência.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <Badge variant="secondary" className="bg-red-900 text-red-100 border-red-600 text-sm">
                      🧟 Apocalipse Zumbi
                    </Badge>
                    <Badge variant="secondary" className="bg-red-900 text-red-100 border-red-600 text-sm">
                      🩸 Horror de Sobrevivência
                    </Badge>
                    <Badge variant="secondary" className="bg-red-900 text-red-100 border-red-600 text-sm">
                      ⚔️ Combate Desesperado
                    </Badge>
                    <Badge variant="secondary" className="bg-red-900 text-red-100 border-red-600 text-sm">
                      🎲 D6 System
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-100 border-gray-500 text-sm">
                      🎯 Sem Mestre
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-900 text-orange-100 border-orange-600 text-sm">
                      👥 Cooperativo
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-900 text-purple-100 border-purple-600 text-sm">
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
            <Card className="border-2 border-red-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-800 to-gray-800 text-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Sparkles className="w-5 h-5" />
                  Dado da Sorte
                </CardTitle>
                <CardDescription className="text-red-200 text-sm">
                  Role o D6 para determinar seu destino
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 bg-gray-800">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  {/* Dado Animado Mobile */}
                  <div className={`relative ${isRolling ? 'animate-bounce' : ''}`}>
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-600 to-orange-600 border-4 border-yellow-500 rounded-lg flex items-center justify-center shadow-lg ${isRolling ? 'animate-spin' : ''}`}>
                      <DiceIcon value={currentDice} size={40} className="text-white sm:size-12" />
                    </div>
                    {isRolling && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-yellow-400 rounded-lg animate-ping" />
                      </div>
                    )}
                  </div>
                  
                  <Badge variant="outline" className="text-xl sm:text-2xl font-bold px-3 py-2 sm:px-4 border-2 border-yellow-500 bg-red-700 text-white">
                    {currentDice}
                  </Badge>
                  
                  <Button 
                    onClick={rollDice}
                    disabled={isRolling}
                    className="w-full bg-gradient-to-r from-red-700 to-gray-700 hover:from-red-800 hover:to-gray-800 text-white font-bold py-3 text-base sm:text-lg min-h-[44px]"
                  >
                    {isRolling ? 'Rolando...' : 'Rolar Dado'}
                  </Button>
                </div>
                
                <Separator className="my-4 sm:my-6 bg-red-600" />
                
                {/* Histórico de Rolagens Mobile */}
                <div>
                  <h3 className="font-semibold text-red-100 mb-3 text-sm sm:text-base">Histórico Recente</h3>
                  <ScrollArea className="h-24 sm:h-32 bg-gray-800 rounded-lg border border-red-800">
                    <div className="space-y-2">
                      {rollHistory.length === 0 ? (
                        <p className="text-gray-400 text-sm">Nenhuma rolagem ainda</p>
                      ) : (
                        rollHistory.map((roll, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <DiceIcon value={roll.result} size={14} className=" text-yellow-400" />
                            <span className="font-medium text-white">{roll.result}</span>
                            <span className="text-gray-400">- {getTableName(roll.table)}</span>
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
            <Card className="border-2 border-red-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-800 to-gray-800 text-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-5 h-5" />
                  Tabelas do DOMINUS ZOMBIE
                </CardTitle>
                <CardDescription className="text-red-200 text-sm">
                  Escolha uma tabela e role o dado para gerar elementos da sua sobrevivência - incluindo o Modo Oráculo para respostas diretas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 bg-gray-800">
                <Tabs value={selectedTable} onValueChange={setSelectedTable} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-gray-700 h-auto min-h-[44px] gap-1">
                    <TabsTrigger value="oraculo" className="data-[state=active]:bg-red-700 data-[state=active]:text-white text-sm px-1 sm:px-3 py-2">
                      <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="hidden sm:inline">Oráculo</span>
                      <span className="sm:hidden">🔮</span>
                    </TabsTrigger>
                    <TabsTrigger value="trama" className="data-[state=active]:bg-red-700 data-[state=active]:text-white text-sm px-1 sm:px-3 py-2">
                      <span className="hidden sm:inline">Trama</span>
                      <span className="sm:hidden">📖</span>
                    </TabsTrigger>
                    <TabsTrigger value="personagem" className="data-[state=active]:bg-red-700 data-[state=active]:text-white text-sm px-1 sm:px-3 py-2">
                      <span className="hidden sm:inline">Personagem</span>
                      <span className="sm:hidden">👤</span>
                    </TabsTrigger>
                    <TabsTrigger value="cena" className="data-[state=active]:bg-red-700 data-[state=active]:text-white text-sm px-1 sm:px-3 py-2">
                      <span className="hidden sm:inline">Cena</span>
                      <span className="sm:hidden">🎬</span>
                    </TabsTrigger>
                    <TabsTrigger value="bancoIdeias" className="data-[state=active]:bg-red-700 data-[state=active]:text-white text-sm px-1 sm:px-3 py-2">
                      <span className="hidden sm:inline">Banco</span>
                      <span className="sm:hidden">💡</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="oraculo" className="mt-4 sm:mt-6">
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-red-100 mb-2">Modo Oráculo</h3>
                      <p className="text-red-300 text-sm sm:text-base">Role o dado para receber respostas diretas: 1-2 = NÃO/Perigo, 3 = TALVEZ/Cautela, 4-6 = SIM/Oportunidade</p>
                    </div>
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-red-800 zombie-scrollbar">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">D6</th>
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">Resultado</th>
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {zombieRpgTables.oraculo.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 font-semibold text-white shadow-lg shadow-orange-600/50' 
                                    : 'hover:bg-gray-600'
                              }`}
                            >
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-gray-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-yellow-400'}`} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-red-800 px-2 py-2 font-bold ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800'
                              } ${item.cor}`}>
                                <div className="flex flex-col">
                                  <span className={isRolling && currentDice === item.d6 ? 'text-black' : 'text-red-100'}>{item.resultado.split(' / ')[0]}</span>
                                  <span className={`text-sm ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-red-200'}`}>{item.resultado.split(' / ')[1]}</span>
                                </div>
                              </td>
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-gray-300'
                              }`}>
                                {item.descricao}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trama" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-red-800 zombie-scrollbar ">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">D6</th>
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">Aconteceu...</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Precisa...</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Senão...</th>
                          </tr>
                        </thead>
                        <tbody>
                          {zombieRpgTables.trama.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 font-semibold text-white shadow-lg shadow-orange-600/50' 
                                    : 'hover:bg-gray-600'
                              }`}
                            >
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-gray-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-yellow-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.aconteceu}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.precisa}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.senao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="personagem" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-red-800 zombie-scrollbar ">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">D6</th>
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">Descrição</th>
                          </tr>
                        </thead>
                        <tbody>
                          {zombieRpgTables.personagem.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 font-semibold text-white shadow-lg shadow-orange-600/50' 
                                    : 'hover:bg-gray-600'
                              } ${
                                selectedCharacter?.id === item.d6 ? 'ring-2 ring-red-600 ring-inset' : ''
                              }`}
                            >
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-gray-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-yellow-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-gray-800'
                              }`}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <span className={isRolling && currentDice === item.d6 ? 'text-black' : 'text-red-100'} dangerouslySetInnerHTML={{ __html: item.descricao }} />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openCharacterCard(item.d6)}
                                    className={`px-2 py-1 text-xs transition-all duration-200 hover:scale-105 min-h-[32px] ${
                                      selectedCharacter?.id === item.d6 
                                        ? 'bg-red-600 text-white border-red-700' 
                                        : isRolling && currentDice === item.d6
                                          ? 'bg-black text-yellow-400 border-black hover:bg-gray-900'
                                          : 'bg-red-900 hover:bg-red-800 border-red-600 hover:border-red-500'
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
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-red-800 zombie-scrollbar ">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">D6</th>
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">Lugar</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Personagem (NPC)</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Evento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {zombieRpgTables.cena.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 font-semibold text-white shadow-lg shadow-orange-600/50' 
                                    : 'hover:bg-gray-600'
                              }`}
                            >
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-gray-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-yellow-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.lugar}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.personagem}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.evento}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bancoIdeias" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-red-800 zombie-scrollbar ">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">D6</th>
                            <th className="border border-red-800 px-2 py-2 text-left text-red-100">Assunto</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Ação</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Coisa</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Item</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Arma</th>
                            <th className="border border-red-800 px-2 py-2 text-left  text-red-100">Qualidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {zombieRpgTables.bancoIdeias.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 font-semibold text-white shadow-lg shadow-orange-600/50' 
                                    : 'hover:bg-gray-600'
                              }`}
                            >
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-gray-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-yellow-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-red-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.assunto}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.acao}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.coisa}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.item}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.arma}</td>
                              <td className={`border border-red-800 px-2 py-2  ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-gray-800 text-red-100'
                              }`}>{item.qualidade}</td>
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

        {/* Regras do Jogo */}
        <div className="mt-8">
          <Card className="border-2 border-red-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-800 to-gray-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Regras do DOMINUS ZOMBIE
              </CardTitle>
              <CardDescription className="text-red-200">
                Sistema completo para sobreviver ao apocalipse zumbi
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Regra 1 */}
                <Card className="border-red-600 bg-gradient-to-br from-gray-700 to-red-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-red-100 flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      Preparação
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 bg-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Escolha (ou role) um Arquétipo na tabela e dê um nome para seu sobrevivente. Depois role um dado para cada uma das três colunas na tabela de Trama.
                    </p>
                    <div className="bg-gray-600 p-3 rounded-lg border border-red-600">
                      <p className="text-xs font-semibold text-red-100 mb-1">📋 Passos:</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Escolha seu Arquétipo</li>
                        <li>• Dê um nome ao sobrevivente</li>
                        <li>• Role 3x na tabela Trama</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 2 */}
                <Card className="border-red-600 bg-gradient-to-br from-gray-700 to-red-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-red-100 flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      Sobrevivência
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 bg-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Para começar sua história, escolha (ou role) um Lugar na tabela de Cenas. Sempre que entrar em uma Cena, role um dado.
                    </p>
                    <div className="bg-gray-600 p-3 rounded-lg border border-red-600">
                      <p className="text-xs font-semibold text-red-100 mb-1">🎲 Resultados:</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• <strong>3 ou menos:</strong> Role um Personagem</li>
                        <li>• <strong>4 ou mais:</strong> Role um Evento</li>
                        <li>• Vá para nova cena quando sobreviver</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 3 */}
                <Card className="border-red-600 bg-gradient-to-br from-gray-700 to-red-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-red-100 flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      Desafio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 bg-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Sempre que seu personagem tentar algo que possa dar errado, você tem um Desafio: role um dado.
                    </p>
                    <div className="bg-gray-600 p-3 rounded-lg border border-red-600">
                      <p className="text-xs font-semibold text-red-100 mb-1">⚡ Resultados:</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• <strong>4 ou mais:</strong> Sucesso!</li>
                        <li>• <strong>Vantagem:</strong> Role 2, escolha o maior</li>
                        <li>• <strong>Desvantagem:</strong> Role 2, escolha o menor</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 4 */}
                <Card className="border-red-600 bg-gradient-to-br from-gray-700 to-red-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-red-100 flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      Dilema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 bg-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Sempre que tiver uma dúvida cuja resposta não seja óbvia, determine duas opções possíveis e role um dado.
                    </p>
                    <div className="bg-gray-600 p-3 rounded-lg border border-red-600">
                      <p className="text-xs font-semibold text-red-100 mb-1">⚖️ Resultados:</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• <strong>3 ou menos:</strong> Primeira opção</li>
                        <li>• <strong>4 ou mais:</strong> Segunda opção</li>
                        <li>• Ex: lutar/fugir, confiar/desconfiar</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Regra 5 */}
                <Card className="border-red-600 bg-gradient-to-br from-gray-700 to-red-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-red-100 flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-sm">
                        5
                      </div>
                      Banco de Ideias
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 bg-gray-800">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      Sempre que precisar elaborar melhor um Lugar, Personagem ou Evento, role no Banco de Ideias.
                    </p>
                    <div className="bg-gray-600 p-3 rounded-lg border border-red-600">
                      <p className="text-xs font-semibold text-red-100 mb-1">💡 Como usar:</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li>• Role no Banco de Ideias</li>
                        <li>• Interprete qualquer coluna</li>
                        <li>• Adapte ao seu cenário</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Resumo Rápido */}
                <Card className="border-red-600 bg-gradient-to-br from-gray-700 to-red-900 lg:col-span-2 xl:col-span-1">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-red-100 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Resumo Rápido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 bg-gray-800">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-xs">
                          ✓
                        </div>
                        <span className="text-gray-300"><strong>4+ = Sucesso</strong> em desafios</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-xs">
                          ?
                        </div>
                        <span className="text-gray-300"><strong>3- = Opção 1</strong> em dilemas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-xs">
                          🎲
                        </div>
                        <span className="text-gray-300"><strong>4+ = Opção 2</strong> em dilemas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-xs">
                          🎯
                        </div>
                        <span className="text-gray-300"><strong>3- = Personagem</strong> em cenas</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold text-xs">
                          ⚡
                        </div>
                        <span className="text-gray-300"><strong>4+ = Evento</strong> em cenas</span>
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
          <Card className="border-2 border-red-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-800 to-gray-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Dicas para Sobreviventes
              </CardTitle>
              <CardDescription className="text-red-200">
                Orientações para sobreviver no mundo dos mortos-vivos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {playerTips.map((category, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-yellow-500 text-gray-900 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-red-100">{category.category}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <Alert key={tipIndex} className="border-red-600 bg-gray-700">
                          <AlertDescription className="text-sm text-gray-300">
                            {tip}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6 bg-red-600" />
              
              <div className="bg-gradient-to-r from-gray-700 to-red-800 p-6 rounded-lg border-2 border-red-600">
                <h3 className="font-bold text-red-100 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Como Começar Sua Sobrevivência
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="font-semibold text-red-200">1. Escolha Seu Arquétipo</p>
                    <p className="text-gray-300">Use a tabela Personagem para definir quem você é neste mundo devastado</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-red-200">2. Entenda a Trama</p>
                    <p className="text-gray-300">Role na tabela Trama para descobrir a situação atual</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-red-200">3. Explore o Cenário</p>
                    <p className="text-gray-300">Use a tabela Cena para criar locais perigosos</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-red-200">4. Inspire-se</p>
                    <p className="text-gray-300">Consulte o Banco de Ideias para elementos sombrios</p>
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
      <footer className="border-t-2 border-red-800 bg-gradient-to-r from-gray-900 to-red-900 text-white mt-12 hover:from-gray-800 hover:to-red-800 transition-all duration-300">
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
              <p className="text-red-200 text-sm leading-relaxed">
                Esta obra foi criada pelo coletivo <strong>"Iniciativa Dominus"</strong> e está licenciada com uma<br />
                <a 
                  href="https://creativecommons.org/licenses/by/4.0/deed.pt_BR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-100 hover:text-red-50 underline transition-colors duration-200"
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