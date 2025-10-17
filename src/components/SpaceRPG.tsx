'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles, BookOpen, Users, Map, Lightbulb, Settings, Clock, Zap, HelpCircle, Rocket, Star, Globe, Shield } from 'lucide-react'
import SpaceCharacterCard from '@/components/SpaceCharacterCard'
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

const spaceRpgTables = {
  oraculo: [
    {
      d6: 1,
      resultado: "NÃO / Perigo",
      descricao: "A resposta é negativa ou algo perigoso acontece no espaço.",
      cor: "text-red-700"
    },
    {
      d6: 2,
      resultado: "NÃO / Risco", 
      descricao: "A resposta é negativa ou há risco iminente de falha sistêmica.",
      cor: "text-red-600"
    },
    {
      d6: 3,
      resultado: "TALVEZ / Anomalia",
      descricao: "A resposta é incerta, anomalia detectada.",
      cor: "text-purple-600"
    },
    {
      d6: 4,
      resultado: "SIM / Descoberta",
      descricao: "A resposta é positiva ou há uma descoberta científica.",
      cor: "text-blue-600"
    },
    {
      d6: 5,
      resultado: "SIM / Vantagem",
      descricao: "A resposta é positiva ou você ganha vantagem tecnológica.",
      cor: "text-blue-700"
    },
    {
      d6: 6,
      resultado: "SIM / Sorte",
      descricao: "A resposta é positiva ou você tem sorte excepcional no cosmos.",
      cor: "text-blue-800"
    }
  ],
  trama: [
    {
      d6: 1,
      aconteceu: "Sinal de socorro detectado de nave desaparecida há décadas.",
      precisa: "Investigar a origem do sinal antes que ele desapareça.",
      senao: "A tripulação perdida estará condenada para sempre."
    },
    {
      d6: 2,
      aconteceu: "Anomalia espacial está se aproximando da nave.",
      precisa: "Analisar e neutralizar a anomalia antes do impacto.",
      senao: "A nave será destruída pela força desconhecida."
    },
    {
      d6: 3,
      aconteceu: "Sistema de suporte de vida está falhando.",
      precisa: "Encontrar peças de reposição em estação espacial abandonada.",
      senao: "O oxigênio acabará em poucas horas."
    },
    {
      d6: 4,
      aconteceu: "Contato com espécie alienígena inteligente estabelecido.",
      precisa: "Estabelecer comunicação e entender suas intenções.",
      senao: "Primeiro contato pode resultar em conflito intergaláctico."
    },
    {
      d6: 5,
      aconteceu: "Vírus desconhecido infectou o computador de bordo.",
      precisa: "Criar antivírus e limpar o sistema antes da perda total.",
      senao: "Controle total da nave será perdido."
    },
    {
      d6: 6,
      aconteceu: "Planeta habitável descoberto em sistema distante.",
      precisa: "Explorar e avaliar perigos antes da colonização.",
      senao: "Colônia humana pode enfrentar ameaças desconhecidas."
    }
  ],
  personagem: [
    {
      d6: 1,
      descricao: "**Capitão Explorador:** Líder nato com experiência em missões perigosas.",
      image: "/images/space-captain.png"
    },
    {
      d6: 2,
      descricao: "**Cientista Espacial:** Especialista em fenômenos cósmicos e vida alienígena.",
      image: "/images/space-scientist.png"
    },
    {
      d6: 3,
      descricao: "**Engenheiro de Nave:** Mantém sistemas críticos funcionando em condições extremas.",
      image: "/images/space-engineer.png"
    },
    {
      d6: 4,
      descricao: "**Piloto Estelar:** Manobra com precisão em asteroides e nebulosas.",
      image: "/images/space-pilot.png"
    },
    {
      d6: 5,
      descricao: "**Médico de Bordo:** Especialista em medicina espacial e emergências.",
      image: "/images/space-medic.png"
    },
    {
      d6: 6,
      descricao: "**Explorador Planetário:** Especialista em sobrevivência e descoberta de novos mundos.",
      image: "/images/space-explorer.png"
    }
  ],
  cena: [
    {
      d6: 1,
      lugar: "Ponte de comando da nave estelar.",
      personagem: "Inteligência artificial com consciência própria.",
      evento: "Alarme de proximidade soa inesperadamente."
    },
    {
      d6: 2,
      lugar: "Laboratório de pesquisa alienígena.",
      personagem: "Cientista louco com experimentos perigosos.",
      evento: "Container de amostra começa a vazar."
    },
    {
      d6: 3,
      lugar: "Caverna cristalina em planeta desconhecido.",
      personagem: "Ser bioluminescente curioso.",
      evento: "Tremores indicam colapso iminente."
    },
    {
      d6: 4,
      lugar: "Estação espacial abandonada.",
      personagem: "Sobrevivente solitário com segredos.",
      evento: "Sistema de energia se reativa sozinho."
    },
    {
      d6: 5,
      lugar: "Nave alienígena capturada.",
      personagem: "Prisioneiro extraterrestre hostil.",
      evento: "Protocolo de autodestruição é ativado."
    },
    {
      d6: 6,
      lugar: "Campo de asteroides radioativo.",
      personagem: "Caçador de recompensas espacial.",
      evento: "Nave mãe inimiga aparece no radar."
    }
  ],
  bancoIdeias: [
    {
      d6: 1,
      assunto: "Conspiração corporativa",
      acao: "Investigar",
      coisa: "Diário de bordo",
      item: "Scanner quântico",
      arma: "Blaster de plasma",
      qualidade: "Classificado"
    },
    {
      d6: 2,
      assunto: "Primeiro contato",
      acao: "Comunicar",
      coisa: "Tradutor universal",
      item: "Gerador de escudo",
      arma: "Disruptor neural",
      qualidade: "Histórico"
    },
    {
      d6: 3,
      assunto: "Anomalia temporal",
      acao: "Estudar",
      coisa: "Artefato antigo",
      item: "Motor de dobra",
      arma: "Canhão de partículas",
      qualidade: "Paradoxal"
    },
    {
      d6: 4,
      assunto: "Infestação parasita",
      acao: "Conter",
      coisa: "Amostra biológica",
      item: "Traje de contenção",
      arma: "Lança-chamas criogênico",
      qualidade: "Quarentenado"
    },
    {
      d6: 5,
      assunto: "Rebelião robótica",
      acao: "Desativar",
      coisa: "Código-fonte",
      item: "Emissor EMP",
      arma: "Rifle magnético",
      qualidade: "Autônomo"
    },
    {
      d6: 6,
      assunto: "Colônia perdida",
      acao: "Resgatar",
      coisa: "Transmissão de emergência",
      item: "Sonda de resgate",
      arma: "Canhão sônico",
      qualidade: "Urgente"
    }
  ]
}

const playerTips = [
  {
    category: "Para Iniciantes",
    tips: [
      "Oxigênio é seu recurso mais valioso - monitore os níveis constantemente",
      "Tecnologia alienígena pode ser imprevisível - teste com cuidado",
      "O espaço é vasto e solitário - mantenha comunicação com a tripulação",
      "Cada planeta tem suas próprias regras - adapte-se rapidamente"
    ]
  },
  {
    category: "Durante a Campanha",
    tips: [
      "Mantenha registro de coordenadas e descobertas - o cosmos é infinito",
      "Conheça os limites da sua nave - não force os sistemas além do máximo",
      "Diplomacia com alienígenas pode salvar mais vidas que combate",
      "Explore verticalmente - estações espaciais têm múltiplos níveis"
    ]
  },
  {
    category: "Avançado",
    tips: [
      "Estude padrões de anomalias espaciais - elas têm ciclos previsíveis",
      "Crie rotas de fuga múltiplas para cada sistema estelar",
      "Desenvolva especialidade na tripulação - cada um tem seu papel crucial",
      "Mantenha sua humanidade - decisões difíceis definem seu legado cósmico"
    ]
  }
]

const DiceIcon = ({ value, size = 24 }: { value: number; size?: number }) => {
  const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
  const Icon = icons[value - 1]
  return <Icon size={size} />
}

export default function SpaceRPG() {
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
        
        const tableData = spaceRpgTables[selectedTable as keyof typeof spaceRpgTables][finalResult - 1]
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
      oraculo: 'Oráculo Cósmico',
      trama: 'Trama Espacial',
      personagem: 'Tripulante',
      cena: 'Cena Estelar',
      bancoIdeias: 'Banco de Ideias'
    }
    return names[table] || table
  }

  const openCharacterCard = (characterId: number) => {
    const character = {
      id: characterId,
      name: spaceRpgTables.personagem[characterId - 1].descricao.split(':')[0].replace('**', ''),
      description: spaceRpgTables.personagem[characterId - 1].descricao.split(':')[1].trim(),
      image: spaceRpgTables.personagem[characterId - 1].image
    }
    setSelectedCharacter(character)
    setIsCharacterModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      {/* Header Espacial Mobile-First */}
      <div className="border-b-4 border-blue-800 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300 animate-pulse" />
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-purple-300" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-100">DOMINUS ESPACIAL</h1>
                <p className="text-blue-300 text-sm">Sistema de Exploração Cósmica</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setTheme('home')}
                variant="outline"
                size="sm"
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-500 min-h-[44px] px-3 py-2"
              >
                <Globe className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Início</span>
                <span className="sm:hidden">🌍</span>
              </Button>
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
              <span className="text-blue-200 text-sm">Dia {Math.floor(Math.random() * 1000)} da Missão</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Introdução Mobile-First */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-900 border-b-2 border-blue-600">
        <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <Rocket className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-blue-100 mb-3">O que é o DOMINUS ESPACIAL?</h2>
                <div className="space-y-3 text-blue-200">
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold">DOMINUS ESPACIAL</span> é um sistema de RPG sem mestre. Este é um DOMINUS de exploração espacial ambientado em um futuro onde a humanidade se expandiu pelas estrelas. O cosmos é vasto, misterioso e cheio de perigos e maravilhas.
                  </p>
                  <p className="leading-relaxed text-sm sm:text-base">
                    <span className="font-semibold text-blue-100">Sem mestre?</span> Exato! Em DOMINUS, os próprios jogadores controlam a narrativa usando as tabelas 
                    intuitivas do sistema. Role o dado para gerar missões, tripulantes, cenas espaciais e elementos surpresa. 
                    Todas as regras essenciais estão integradas nas ferramentas que você vê nesta página - 
                    <span className="italic">"você encontrará todas as regras do Dominus no verso desta folha."</span>
                  </p>
                  <p className="leading-relaxed text-sm sm:text-base">
                    Como explorador espacial, você enfrentará fenômenos cósmicos, encontrará espécies alienígenas, 
                    descobrirá planetas habitáveis e tomará decisões que afetarão o futuro da humanidade. 
                    O sistema usa mecânicas simples baseadas em D6 para gerar histórias dinâmicas e colaborativas de ficção científica.
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <Badge variant="secondary" className="bg-blue-900 text-blue-100 border-blue-600 text-sm">
                      🚀 Exploração Espacial
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-900 text-blue-100 border-blue-600 text-sm">
                      👽 Contato Alienígena
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-900 text-blue-100 border-blue-600 text-sm">
                      ⚡ Tecnologia Futurista
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-900 text-blue-100 border-blue-600 text-sm">
                      🎲 D6 System
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-100 border-slate-500 text-sm">
                      🎯 Sem Mestre
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-900 text-purple-100 border-purple-600 text-sm">
                      👥 Tripulação Cooperativa
                    </Badge>
                    <Badge variant="secondary" className="bg-indigo-900 text-indigo-100 border-indigo-600 text-sm">
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
            <Card className="border-2 border-blue-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-800 to-slate-800 text-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  Painel de Controle
                </CardTitle>
                <CardDescription className="text-blue-200 text-sm">
                  Sistema de Geração Estelar
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {/* Seletor de Tabela */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-blue-100">Sistema Ativo:</label>
                  <select 
                    value={selectedTable}
                    onChange={(e) => setSelectedTable(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 border border-blue-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="oraculo">Oráculo Cósmico</option>
                    <option value="trama">Trama Espacial</option>
                    <option value="personagem">Tripulante</option>
                    <option value="cena">Cena Estelar</option>
                    <option value="bancoIdeias">Banco de Ideias</option>
                  </select>
                </div>

                {/* Botão de Rolar Dado */}
                <Button 
                  onClick={rollDice}
                  disabled={isRolling}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none min-h-[44px]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <DiceIcon value={currentDice} size={24} className={`${isRolling ? 'animate-spin' : ''}`} />
                    <span>{isRolling ? 'Calculando...' : 'Rolar D6 Cósmico'}</span>
                  </div>
                </Button>

                {/* Resultado Atual */}
                {currentResult && (
                  <Card className="border-blue-600 bg-slate-700">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-blue-100 mb-2">Resultado Cósmico:</h4>
                      <div className="text-blue-200">
                        {selectedTable === 'oraculo' && (
                          <div>
                            <p className="font-semibold text-blue-100">{currentResult.resultado}</p>
                            <p className="text-sm mt-1">{currentResult.descricao}</p>
                          </div>
                        )}
                        {selectedTable === 'trama' && (
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold text-blue-100">Aconteceu:</span> {currentResult.aconteceu}</p>
                            <p><span className="font-semibold text-blue-100">Precisa:</span> {currentResult.precisa}</p>
                            <p><span className="font-semibold text-blue-100">Senão:</span> {currentResult.senao}</p>
                          </div>
                        )}
                        {selectedTable === 'personagem' && (
                          <div dangerouslySetInnerHTML={{ __html: currentResult.descricao }} />
                        )}
                        {selectedTable === 'cena' && (
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold text-blue-100">Lugar:</span> {currentResult.lugar}</p>
                            <p><span className="font-semibold text-blue-100">Personagem:</span> {currentResult.personagem}</p>
                            <p><span className="font-semibold text-blue-100">Evento:</span> {currentResult.evento}</p>
                          </div>
                        )}
                        {selectedTable === 'bancoIdeias' && (
                          <div className="space-y-2 text-sm">
                            <p><span className="font-semibold text-blue-100">Assunto:</span> {currentResult.assunto}</p>
                            <p><span className="font-semibold text-blue-100">Ação:</span> {currentResult.acao}</p>
                            <p><span className="font-semibold text-blue-100">Coisa:</span> {currentResult.coisa}</p>
                            <p><span className="font-semibold text-blue-100">Item:</span> {currentResult.item}</p>
                            <p><span className="font-semibold text-blue-100">Arma:</span> {currentResult.arma}</p>
                            <p><span className="font-semibold text-blue-100">Qualidade:</span> {currentResult.qualidade}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Histórico de Rolagens */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-100 text-sm">Registro de Missões:</h4>
                  <ScrollArea className="h-32 w-full rounded-lg border border-blue-600 bg-slate-700 p-2">
                    <div className="space-y-2">
                      {rollHistory.map((roll, index) => (
                        <div key={index} className="text-xs text-blue-200 p-2 bg-slate-600 rounded">
                          <span className="font-semibold">{getTableName(roll.table)}:</span> D{roll.result}
                        </div>
                      ))}
                      {rollHistory.length === 0 && (
                        <p className="text-blue-300 text-xs italic">Nenhuma missão registrada ainda</p>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabelas RPG - Mobile First */}
          <div className="xl:col-span-2">
            <Card className="border-2 border-blue-800 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-800 to-slate-800 text-white">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                  Manuais de Exploração Espacial
                </CardTitle>
                <CardDescription className="text-blue-200 text-sm">
                  Tabelas de Geração de Aventuras Cósmicas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Tabs value={selectedTable} onValueChange={setSelectedTable} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-2 bg-slate-700">
                    <TabsTrigger value="oraculo" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2">
                      Oráculo
                    </TabsTrigger>
                    <TabsTrigger value="trama" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2">
                      Trama
                    </TabsTrigger>
                    <TabsTrigger value="personagem" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2">
                      Tripulação
                    </TabsTrigger>
                    <TabsTrigger value="cena" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2 hidden sm:inline-flex">
                      Cena
                    </TabsTrigger>
                    <TabsTrigger value="bancoIdeias" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white text-xs sm:text-sm px-1 sm:px-3 py-2 hidden sm:inline-flex">
                      Ideias
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="oraculo" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-blue-800 space-scrollbar">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-700">
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">D6</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Resultado</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Descrição Cósmica</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spaceRpgTables.oraculo.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-blue-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-600/50' 
                                    : 'hover:bg-slate-600'
                              }`}
                            >
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-slate-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-blue-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 font-semibold ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 ' + item.cor
                              }`}>
                                {item.resultado}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
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
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-blue-800 space-scrollbar">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-700">
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">D6</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Aconteceu</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Precisa</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Senão</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spaceRpgTables.trama.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-blue-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-600/50' 
                                    : 'hover:bg-slate-600'
                              }`}
                            >
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-slate-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-blue-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.aconteceu}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.precisa}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-red-300'
                              }`}>
                                {item.senao}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="personagem" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-blue-800 space-scrollbar">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-700">
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">D6</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Tripulante Estelar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spaceRpgTables.personagem.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-blue-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-600/50' 
                                    : 'hover:bg-slate-600'
                              } ${
                                selectedCharacter?.id === item.d6 ? 'ring-2 ring-blue-600 ring-inset' : ''
                              }`}
                            >
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-slate-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-blue-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-slate-800'
                              }`}>
                                <div className="flex items-center gap-3">
                                  <img 
                                    src={item.image} 
                                    alt={item.descricao.split(':')[0].replace('**', '')}
                                    className="w-12 h-12 rounded-lg object-cover border-2 border-blue-600"
                                  />
                                  <span className={isRolling && currentDice === item.d6 ? 'text-black' : 'text-blue-100'} dangerouslySetInnerHTML={{ __html: item.descricao }} />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cena" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-blue-800 space-scrollbar">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-700">
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">D6</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Lugar</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Personagem (NPC)</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Evento</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spaceRpgTables.cena.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-blue-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-600/50' 
                                    : 'hover:bg-slate-600'
                              }`}
                            >
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-slate-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-blue-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.lugar}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.personagem}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-purple-300'
                              }`}>
                                {item.evento}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="bancoIdeias" className="mt-4 sm:mt-6">
                    <div className="overflow-auto max-h-[28rem] rounded-lg border border-blue-800 space-scrollbar">
                      <table className="w-full min-w-[800px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-700">
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">D6</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Assunto</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Ação</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Coisa</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Item</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Arma</th>
                            <th className="border border-blue-800 px-2 py-2 text-left text-blue-100">Qualidade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spaceRpgTables.bancoIdeias.map((item) => (
                            <tr 
                              key={item.d6} 
                              className={`transition-all duration-300 ${
                                isRolling 
                                  ? currentDice === item.d6 
                                    ? 'bg-gradient-to-r from-yellow-500 to-blue-500 font-bold text-black shadow-lg shadow-yellow-500/50 scale-105' 
                                    : 'opacity-30'
                                  : currentResult?.d6 === item.d6 
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white shadow-lg shadow-blue-600/50' 
                                    : 'hover:bg-slate-600'
                              }`}
                            >
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent' : 'bg-slate-800'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <DiceIcon value={item.d6} size={16} className={`${isRolling && currentDice === item.d6 ? 'text-black' : 'text-blue-400'} `} />
                                  <span className={`font-medium ${isRolling && currentDice === item.d6 ? 'text-black' : 'text-white'}`}>{item.d6}</span>
                                </div>
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.assunto}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.acao}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.coisa}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.item}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-blue-100'
                              }`}>
                                {item.arma}
                              </td>
                              <td className={`border border-blue-800 px-2 py-2 ${
                                isRolling && currentDice === item.d6 ? 'bg-transparent text-black' : 'bg-slate-800 text-purple-300'
                              }`}>
                                {item.qualidade}
                              </td>
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

        {/* Seção de Dicas para Jogadores */}
        <div className="mt-8">
          <Card className="border-2 border-blue-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-800 to-slate-800 text-white">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                Guia do Explorador Espacial
              </CardTitle>
              <CardDescription className="text-blue-200 text-sm">
                Dicas essenciais para sobreviver e prosperar no cosmos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {playerTips.map((category, index) => (
                  <Card key={index} className="border-blue-600 bg-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-100 text-base sm:text-lg flex items-center gap-2">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-blue-200 text-xs sm:text-sm flex items-start gap-2">
                            <span className="text-blue-400 mt-0.5 sm:mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seção de Regras Rápidas */}
        <div className="mt-6">
          <Card className="border-2 border-blue-800 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-800 to-slate-800 text-white">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                Regras do DOMINUS ESPACIAL
              </CardTitle>
              <CardDescription className="text-blue-200 text-sm">
                Sistema básico para jogar sem mestre
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-blue-100 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Como Jogar
                    </h4>
                    <ul className="space-y-2 text-blue-200 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">1.</span>
                        <span>Use as tabelas para gerar elementos da história</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">2.</span>
                        <span>Role D6 e interprete os resultados criativamente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">3.</span>
                        <span>Combine diferentes tabelas para criar aventuras complexas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">4.</span>
                        <span>Colabore com outros jogadores para expandir a narrativa</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-blue-100 mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Quando Usar Cada Tabela
                    </h4>
                    <ul className="space-y-2 text-blue-200 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-blue-400">Oráculo:</span>
                        <span>Para perguntas de sim/não e situações incertas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-blue-400">Trama:</span>
                        <span>Para criar missões e conflitos principais</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-blue-400">Tripulação:</span>
                        <span>Para gerar personagens e seus perfis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-blue-400">Cena:</span>
                        <span>Para descrever locais e situações específicas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-semibold text-blue-400">Ideias:</span>
                        <span>Para inspiração e elementos surpresa</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Alert className="mt-4 sm:mt-6 border-blue-600 bg-slate-700">
                <Rocket className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-200 text-sm">
                  <span className="font-semibold text-blue-100">Dica do Comandante:</span> 
                  {" "}O cosmos é vasto e imprevisível. Confie na sua intuição, use a tecnologia a seu favor, 
                  e nunca subestime o poder da colaboração espacial. Boa sorte, explorador!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Modal do Personagem */}
      {selectedCharacter && (
        <SpaceCharacterCard
          character={selectedCharacter}
          isOpen={isCharacterModalOpen}
          onClose={() => setIsCharacterModalOpen(false)}
        />
      )}
      
      {/* Footer - Licenciamento */}
      <footer className="border-t-2 border-blue-800 bg-gradient-to-r from-slate-900 to-blue-900 text-white mt-12 hover:from-slate-800 hover:to-blue-800 transition-all duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Rocket className="w-6 h-6 text-blue-300" />
              <span className="text-blue-100 font-semibold">DOMINUS ESPACIAL</span>
            </div>
            <div className="text-center md:text-right text-blue-200 text-sm">
              <p>Sistema de Exploração Cósmica • Versão 1.0</p>
              <p className="text-blue-300 text-xs mt-1">Criado com tecnologia de ponta para aventuras sem limites</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}