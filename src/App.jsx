import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity, AlertTriangle, BarChart3, Bell, Check,
  Cloud, CloudLightning, Droplets, Eye, FileUp, Globe2, Layers3, Leaf,
  Menu, MessageCircle, Minimize2, Plus, RotateCcw, Send, Shield,
  Sprout, Sun, Wind, X, Maximize2, MapPin, CalendarDays,
} from 'lucide-react'

const initialParcels = [
  { id: 'p1', name: 'Lote 1 — El Bajo', hectares: 18.5, crop: 'Poroto Alubia', cropEn: 'White bean', health: 91, moisture: 68, temp: 24, ndvi: .78, status: 'good', note: 'Las plantas vienen parejas y verdes. La tierra se siente fresca al hacer el pancito con la pala.', tech: 'NDVI 0,78 · humedad superficial estimada 68 % · temperatura de suelo 24 °C.', npk: { n: 78, p: 65, k: 82 }, coords: '30,40 180,30 195,150 40,165' },
  { id: 'p2', name: 'Lote 2 — La Lomada', hectares: 14, crop: 'Maíz templado', cropEn: 'Temperate corn', health: 64, moisture: 31, temp: 32, ndvi: .48, status: 'warn', note: 'En la parte alta las hojas se acartuchan un poco a la siesta. Revise la humedad temprano.', tech: 'NDVI 0,48 · déficit hídrico moderado estimado · temperatura de suelo 32 °C.', npk: { n: 45, p: 58, k: 70 }, coords: '190,30 340,45 330,175 205,155' },
  { id: 'p3', name: 'Lote 7 — Monte Viejo', hectares: 23.4, crop: 'Rastrojo / preparación', cropEn: 'Bean stubble / fallow', health: 48, moisture: 19, temp: 35, ndvi: .24, status: 'risk', note: 'Conserve el rastrojo de poroto sobre el suelo; ayuda a proteger la humedad y evita dejar la tierra desnuda.', tech: 'NDVI 0,24 · humedad baja estimada · cobertura recomendada para reducir erosión.', npk: { n: 35, p: 42, k: 60 }, coords: '45,175 325,185 310,275 60,265' },
]

const copy = {
  es: {
    brand: 'Agricultura inteligente', nav: { dashboard: 'Panel principal', farms: 'Establecimientos', satellite: 'Explorador satelital', crops: 'Cultivos y rotación', tasks: 'Calendario y tareas', history: 'Historial y tendencias', assistant: 'Asistente TERRA+ AI' },
    practical: 'Práctica · Guía de campo', technical: 'Técnica · Datos y precisión', infoStyle: 'Estilo de información', demo: 'Prototipo · datos de demostración', demoLong: 'Este prototipo muestra valores ilustrativos. No está conectado a satélites ni ofrece pronósticos meteorológicos reales.',
    dashboard: 'Panel principal', welcome: 'Una mirada clara para cuidar cada lote.', farm: 'Establecimiento', hectares: 'Superficie total', health: 'Salud promedio', moisture: 'Humedad estimada', pending: 'Tareas abiertas', optimal: 'promedio ponderado por superficie',
    horizon: 'Escenario climático', today: 'Hoy · referencia', tomorrow: 'Mañana · +24 h', threeDays: 'En 3 días · +72 h', chooseEvent: 'Simular un evento para ver medidas de preparación', heat: 'Ola de calor + viento norte', hail: 'Tormenta y granizo', storm: 'Ráfagas severas', scenario: 'ESCENARIO SIMULADO · NO ES UN PRONÓSTICO', protection: 'Preparación sugerida', practicalAdvice: 'Revise la humedad con pala temprano, conserve el rastrojo cubriendo el suelo y evite labores que lo dejen desnudo. Organice el riego si está disponible.', technicalAdvice: 'Escenario ilustrativo: planifique el riego según medición local, conserve cobertura y suspenda tareas sensibles al viento. Verifique pronósticos oficiales antes de actuar.', hailAdvice: 'Revise drenajes en sectores bajos y proteja almácigos o cultivos delicados si dispone de cobertura. Asegure herramientas y equipos.', hailTechnical: 'Verifique drenajes, estructuras y cobertura de cultivos intensivos. Consulte alertas meteorológicas oficiales y evalúe daños tras el evento.', stormAdvice: 'Asegure chapas y equipos. Evite permanecer bajo árboles o en zonas expuestas durante tormentas fuertes; priorice la seguridad de personas y animales.', stormTechnical: 'Asegure infraestructura y suspenda labores expuestas según alertas oficiales. Priorice protocolos de seguridad y documente daños cuando sea seguro.',
    farmMap: 'Mi establecimiento · lotes', satelliteMap: 'Explorador de capas', addParcel: 'Crear lote rápido', minimize: 'Minimizar', restore: 'Restaurar', maximize: 'Maximizar', layers: 'Variable del mapa', weather: 'Clima · escenario', soil: 'Humedad del suelo · referencia', vigor: 'Vigor vegetal · NDVI de ejemplo', erosion: 'Pendiente y erosión · esquema', wind: 'Viento · escenario', selectParcel: 'Seleccione un lote para ver el detalle', crop: 'Cultivo', parcelHealth: 'Salud', soilTemp: 'Temp. suelo', vigorShort: 'NDVI', practicalDiagnosis: 'Observación de campo', technicalDiagnosis: 'Indicadores ilustrativos',
    recs: 'Recomendaciones', taskList: 'Tareas del campo', assistant: 'Asistente de demostración', ask: 'Preguntá por tus lotes…', send: 'Enviar', markDone: 'Marcar como lista', done: 'Lista', pendingTag: 'Pendiente', inProgress: 'En curso', upload: 'Elegir foto, PDF o planilla', fileNote: 'El archivo queda en tu dispositivo; este prototipo no lo sube ni analiza.',
    create: 'Crear nuevo lote', name: 'Nombre del lote', area: 'Superficie (ha)', cropLabel: 'Cultivo actual', cancel: 'Cancelar', save: 'Guardar lote', validation: 'Ingresá un nombre y una superficie mayor que cero.', close: 'Cerrar', noTasks: 'No hay tareas pendientes.', cropsTitle: 'Cultivos y rotación', cropsBody: 'Cultivos registrados en el establecimiento de demostración.', historyTitle: 'Historial y tendencias', historyBody: 'Este prototipo no guarda mediciones históricas. Las cifras del panel son referencias ilustrativas.', farmsTitle: 'Mis establecimientos', farmsBody: 'Finca San Isidro · Cerrillos, Salta · ubicación de ejemplo.', assistantBody: 'Este asistente usa respuestas de muestra basadas en el lote seleccionado; no consulta una IA ni datos en vivo.', mapNote: 'Mapa esquemático de demostración · las parcelas no representan límites geográficos reales.', source: 'Origen de valores', sourceBody: 'Datos de ejemplo creados para mostrar la interfaz. Confirme cualquier decisión con observación de campo y fuentes meteorológicas oficiales.', layerHint: 'Las capas son esquemáticas; no muestran productos NASA en tiempo real.', empty: 'Sin lotes registrados', overview: 'Volver al panel',
  },
  en: {
    brand: 'Smart agriculture', nav: { dashboard: 'Dashboard', farms: 'Farms', satellite: 'Satellite explorer', crops: 'Crops & rotation', tasks: 'Calendar & tasks', history: 'History & trends', assistant: 'TERRA+ AI assistant' },
    practical: 'Practical · Field guide', technical: 'Technical · Data & precision', infoStyle: 'Information style', demo: 'Prototype · demo data', demoLong: 'This prototype uses illustrative values. It is not connected to satellites and does not provide real weather forecasts.',
    dashboard: 'Dashboard', welcome: 'A clear view to care for every plot.', farm: 'Farm', hectares: 'Total area', health: 'Average health', moisture: 'Estimated moisture', pending: 'Open tasks', optimal: 'area-weighted average',
    horizon: 'Weather scenario', today: 'Today · reference', tomorrow: 'Tomorrow · +24h', threeDays: 'In 3 days · +72h', chooseEvent: 'Simulate an event to see preparation steps', heat: 'Heatwave + north wind', hail: 'Storm and hail', storm: 'Severe gusts', scenario: 'SIMULATED SCENARIO · NOT A FORECAST', protection: 'Suggested preparation', practicalAdvice: 'Check soil moisture with a spade early, keep residue covering the soil, and avoid leaving bare ground. Plan irrigation if available.', technicalAdvice: 'Illustrative scenario: plan irrigation using local measurements, maintain ground cover, and avoid wind-sensitive work. Check official forecasts before acting.', hailAdvice: 'Check drainage in low areas and protect seedlings or sensitive crops if covers are available. Secure tools and equipment.', hailTechnical: 'Check drainage, structures, and cover for intensive crops. Consult official weather alerts and assess damage afterward.', stormAdvice: 'Secure roofs and equipment. During severe storms, avoid trees and exposed areas; prioritize the safety of people and animals.', stormTechnical: 'Secure infrastructure and suspend exposed work according to official alerts. Prioritize safety protocols and document damage when safe.',
    farmMap: 'My farm · plots', satelliteMap: 'Layer explorer', addParcel: 'Quick add plot', minimize: 'Minimize', restore: 'Restore', maximize: 'Maximize', layers: 'Map variable', weather: 'Weather · scenario', soil: 'Soil moisture · reference', vigor: 'Plant vigor · sample NDVI', erosion: 'Slope and erosion · schematic', wind: 'Wind · scenario', selectParcel: 'Select a plot to view details', crop: 'Crop', parcelHealth: 'Health', soilTemp: 'Soil temp.', vigorShort: 'NDVI', practicalDiagnosis: 'Field observation', technicalDiagnosis: 'Illustrative indicators',
    recs: 'Recommendations', taskList: 'Field tasks', assistant: 'Demo assistant', ask: 'Ask about your plots…', send: 'Send', markDone: 'Mark complete', done: 'Complete', pendingTag: 'Pending', inProgress: 'In progress', upload: 'Choose photo, PDF or spreadsheet', fileNote: 'The file stays on your device; this prototype does not upload or analyze it.',
    create: 'Create a new plot', name: 'Plot name', area: 'Area (ha)', cropLabel: 'Current crop', cancel: 'Cancel', save: 'Save plot', validation: 'Enter a name and an area greater than zero.', close: 'Close', noTasks: 'No open tasks.', cropsTitle: 'Crops & rotation', cropsBody: 'Crops registered on the demo farm.', historyTitle: 'History & trends', historyBody: 'This prototype does not store historical measurements. Dashboard figures are illustrative references.', farmsTitle: 'My farms', farmsBody: 'Finca San Isidro · Cerrillos, Salta · sample location.', assistantBody: 'This assistant uses sample replies based on the selected plot; it does not query an AI or live data.', mapNote: 'Schematic demo map · plot shapes are not real geographic boundaries.', source: 'Value source', sourceBody: 'Sample data created to demonstrate the interface. Confirm decisions with field observations and official weather sources.', layerHint: 'Layers are schematic and do not display live NASA products.', empty: 'No plots registered', overview: 'Back to dashboard',
  },
}

const initialTasks = [
  { id: 't1', title: 'Riego preventivo · Lote 2', titleEn: 'Preventive irrigation · Plot 2', detail: 'Mañana · 06:30 · Prioridad alta', detailEn: 'Tomorrow · 06:30 · High priority', status: 'pending' },
  { id: 't2', title: 'Revisar cobertura · Lote 7', titleEn: 'Check ground cover · Plot 7', detail: 'Jueves · Control de suelo', detailEn: 'Thursday · Soil check', status: 'progress' },
]

const nav = [
  ['dashboard', Sprout], ['farms', MapPin], ['satellite', Globe2], ['crops', Layers3], ['tasks', CalendarDays], ['history', BarChart3], ['assistant', MessageCircle],
]
const crops = ['Poroto Alubia', 'Poroto Negro', 'Maíz templado', 'Soja', 'Trigo / cobertura', 'Hortalizas / huerta']
const cropsEn = { 'Poroto Alubia': 'White bean', 'Poroto Negro': 'Black bean', 'Maíz templado': 'Temperate corn', 'Soja': 'Soybean', 'Trigo / cobertura': 'Wheat / cover crop', 'Hortalizas / huerta': 'Vegetables / garden' }
function readSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(`terra-plus:${key}`)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function IconButton({ label, onClick, children }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className="icon-button">{children}</button>
}

function App() {
  const [language, setLanguage] = useState('es')
  const [view, setView] = useState('practical')
  const [tab, setTab] = useState('dashboard')
  const [mobileNav, setMobileNav] = useState(false)
  const [parcels, setParcels] = useState(() => readSaved('parcels', initialParcels))
  const [selectedId, setSelectedId] = useState('p2')
  const [layer, setLayer] = useState('weather')
  const [horizon, setHorizon] = useState('today')
  const [event, setEvent] = useState('heat')
  const [map1, setMap1] = useState('normal')
  const [map2, setMap2] = useState('normal')
  const [tasks, setTasks] = useState(() => readSaved('tasks', initialTasks))
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [area, setArea] = useState('')
  const [crop, setCrop] = useState(crops[0])
  const [error, setError] = useState('')
  const [chat, setChat] = useState([])
  const [question, setQuestion] = useState('')
  const [fileName, setFileName] = useState('')
  const modalRef = useRef(null)
  const openerRef = useRef(null)
  const t = copy[language]
  const selected = parcels.find(p => p.id === selectedId) || parcels[0]
  const totals = useMemo(() => {
    const hectares = parcels.reduce((sum, p) => sum + p.hectares, 0)
    const weighted = key => hectares ? parcels.reduce((sum, p) => sum + p[key] * p.hectares, 0) / hectares : 0
    return { hectares, health: weighted('health'), moisture: weighted('moisture') }
  }, [parcels])
  const openTasks = tasks.filter(task => task.status !== 'done').length

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])
  useEffect(() => {
    try {
      localStorage.setItem('terra-plus:parcels', JSON.stringify(parcels))
      localStorage.setItem('terra-plus:tasks', JSON.stringify(tasks))
    } catch { /* Storage may be disabled in private browsing. */ }
  }, [parcels, tasks])
  useEffect(() => {
    if (!modal) {
      openerRef.current?.focus()
      return undefined
    }
    modalRef.current?.querySelector('input')?.focus()
    const handler = e => {
      if (e.key === 'Escape') setModal(false)
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = [...modalRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled])')]
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modal])

  const title = tab === 'dashboard' ? t.dashboard : t.nav[tab]
  const recommendations = view === 'practical'
    ? [
      { title: language === 'es' ? 'Acompañar el Lote 2 antes del calor' : 'Check Plot 2 before the heat', body: language === 'es' ? 'La lomada suele secarse antes. Revise con pala temprano y riegue solo si tiene disponibilidad y lo confirma en campo.' : 'The higher ground tends to dry sooner. Check with a spade early and irrigate only if available and field conditions confirm it.', tone: 'green' },
      { title: language === 'es' ? 'Cuidar la cobertura del Lote 7' : 'Protect Plot 7 ground cover', body: language === 'es' ? 'Mantener el rastrojo sobre la tierra ayuda a protegerla del sol y el viento.' : 'Keeping residue on the soil helps protect it from sun and wind.', tone: 'amber' },
    ]
    : [
      { title: language === 'es' ? 'Monitorear humedad en Lote 2' : 'Monitor moisture in Plot 2', body: language === 'es' ? 'Valor ilustrativo 31 %. Validar con medición local antes de ajustar la lámina de riego.' : 'Illustrative value 31%. Validate with local measurement before adjusting irrigation.', tone: 'green' },
      { title: language === 'es' ? 'Mantener cobertura en Lote 7' : 'Maintain cover on Plot 7', body: language === 'es' ? 'NDVI ilustrativo 0,24. Evaluar cobertura y riesgo de erosión en campo.' : 'Illustrative NDVI 0.24. Assess ground cover and erosion risk in the field.', tone: 'amber' },
    ]

  const changeTab = id => { setTab(id); setMobileNav(false) }
  const openParcelModal = e => { openerRef.current = e.currentTarget; setError(''); setModal(true) }
  const addParcel = e => {
    e.preventDefault()
    const hectares = Number(area)
    if (!name.trim() || !Number.isFinite(hectares) || hectares <= 0) {
      setError(t.validation)
      return
    }
    const id = `p-${crypto.randomUUID()}`
    const item = { id, name: name.trim(), hectares, crop, cropEn: cropsEn[crop] || crop, health: 75, moisture: 45, temp: 28, ndvi: .55, status: 'warn', note: language === 'es' ? 'Lote agregado. Los valores son ilustrativos y deben confirmarse en campo.' : 'Plot added. Values are illustrative and should be confirmed in the field.', tech: 'Demo values · validate with field observations.', npk: { n: 60, p: 55, k: 65 }, coords: '' }
    setParcels(current => [...current, item])
    setSelectedId(id)
    setName(''); setArea(''); setError(''); setModal(false)
  }
  const advice = event === 'heat'
    ? (view === 'practical' ? t.practicalAdvice : t.technicalAdvice)
    : event === 'hail'
      ? (view === 'practical' ? t.hailAdvice : t.hailTechnical)
      : (view === 'practical' ? t.stormAdvice : t.stormTechnical)
  const toggleTask = id => setTasks(items => items.map(task => task.id === id ? { ...task, status: task.status === 'done' ? 'pending' : 'done' } : task))
  const sendChat = e => {
    e.preventDefault()
    const q = question.trim()
    if (!q) return
    const answer = view === 'practical'
      ? (language === 'es' ? `Para ${selected?.name}: el valor de humedad de ejemplo es ${selected?.moisture} %. Revisá la tierra en el lote y usá ese dato solo como orientación.` : `For ${selected?.name}: the sample moisture value is ${selected?.moisture}%. Check the soil in the field and use this as guidance only.`)
      : (language === 'es' ? `Referencia técnica para ${selected?.name}: ${selected?.hectares} ha · humedad de ejemplo ${selected?.moisture} % · NDVI ilustrativo ${selected?.ndvi}. No son mediciones en vivo.` : `Technical reference for ${selected?.name}: ${selected?.hectares} ha · sample moisture ${selected?.moisture}% · illustrative NDVI ${selected?.ndvi}. These are not live measurements.`)
    setChat(items => [...items, { q, answer }]); setQuestion('')
  }

  const renderMap = (which) => {
    const isFarm = which === 1
    const size = isFarm ? map1 : map2
    const setSize = isFarm ? setMap1 : setMap2
    const mapTitle = isFarm ? t.farmMap : t.satelliteMap
    const layerColors = { weather: ['#a7f3d0', '#fde68a', '#fecaca'], soil: parcels.map(p => p.moisture > 55 ? '#7dd3fc' : p.moisture > 30 ? '#fcd34d' : '#fb923c'), vigor: parcels.map(p => p.ndvi > .65 ? '#4ade80' : p.ndvi > .4 ? '#a3e635' : '#facc15'), erosion: parcels.map(p => p.status === 'risk' ? '#fb7185' : '#d6d3d1'), wind: ['#bfdbfe', '#c4b5fd', '#99f6e4'] }
    const colors = layerColors[layer] || layerColors.weather
    const columns = parcels.length === 1 ? 1 : Math.min(3, Math.max(1, Math.ceil(Math.sqrt(parcels.length * 1.3))))
    const rows = Math.ceil(parcels.length / columns)
    const cellW = 340 / columns
    const cellH = 260 / Math.max(2, rows)
    const mapDescription = isFarm ? t.mapNote : t.layerHint
    const d = size === 'min' ? ' map-collapsed' : size === 'max' ? ' map-expanded' : ''
    return <section className={`card map-card${d}`} key={`map-${which}`}>
      <div className="card-head"><div className="title-icon"><span className="icon-tile"><MapPin size={18}/></span><div><h2>{mapTitle}</h2><p>{isFarm ? `${parcels.length} ${language === 'es' ? 'lotes' : 'plots'} · ${totals.hectares.toFixed(1)} ha` : t.demo}</p></div></div><div className="head-actions">{isFarm && <button className="button button-primary button-small" onClick={openParcelModal}><Plus size={15}/>{t.addParcel}</button>}<IconButton label={size === 'min' ? t.restore : t.minimize} onClick={() => setSize(size === 'min' ? 'normal' : 'min')}>{size === 'min' ? <RotateCcw size={16}/> : <Minimize2 size={16}/>}</IconButton><IconButton label={size === 'max' ? t.restore : t.maximize} onClick={() => setSize(size === 'max' ? 'normal' : 'max')}>{size === 'max' ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}</IconButton></div></div>
      {size !== 'min' && <div className="map-content">
        {!isFarm && <label className="layer-select"><span>{t.layers}</span><select value={layer} onChange={e => setLayer(e.target.value)}><option value="weather">{t.weather}</option><option value="soil">{t.soil}</option><option value="vigor">{t.vigor}</option><option value="erosion">{t.erosion}</option><option value="wind">{t.wind}</option></select></label>}
        <div className={`map-visual layer-${layer}`}><div className="map-stamp">{isFarm ? t.demo : t.scenario}</div><svg viewBox="0 0 380 310" role="img" aria-label={mapDescription}>
          <path d="M0 245 Q70 205 138 235 T280 222 T380 230 V310 H0Z" fill="#f0ead9" opacity=".6"/><path d="M0 40 Q95 84 160 55 T300 74 T380 48" fill="none" stroke="#ffffff" strokeWidth="2" opacity=".5"/>
          {parcels.map((p, i) => {
            const x = 20 + (i % columns) * cellW
            const y = 25 + Math.floor(i / columns) * cellH
            const points = `${x + 6},${y + 8} ${x + cellW - 9},${y} ${x + cellW - 3},${y + cellH - 10} ${x + 15},${y + cellH - 3}`
            return <g key={p.id} onClick={() => setSelectedId(p.id)} role="button" tabIndex="0" aria-label={`${p.name}, ${p.hectares} ha`} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(p.id) } }}>
            <polygon points={points} fill={isFarm ? (p.status === 'good' ? '#22c55e' : p.status === 'warn' ? '#eab308' : '#ef4444') : (Array.isArray(colors) ? colors[i % colors.length] : colors[i] || colors[0])} fillOpacity={selectedId === p.id ? '.8' : '.58'} stroke={selectedId === p.id ? '#064e3b' : '#ffffff'} strokeWidth={selectedId === p.id ? '4' : '2'} strokeDasharray={isFarm ? '' : '5 3'} />
            <text x={x + cellW / 2} y={y + cellH / 2} textAnchor="middle" fontSize="10" fontWeight="700" fill="#12352b">{p.name.split('—')[0].trim()}</text>
          </g>})}
        </svg><p className="map-caption">{mapDescription}</p></div>
        {isFarm && selected && <div className="parcel-detail"><div className="detail-top"><div><span className="eyebrow">{t.selectParcel}</span><h3>{selected.name}</h3></div><span className={`health-pill ${selected.status}`}>{selected.health}% {t.parcelHealth}</span></div><div className="detail-stats"><div><span>{t.crop}</span><b>{language === 'en' ? selected.cropEn : selected.crop}</b></div><div><span>{t.moisture}</span><b>{selected.moisture}%</b></div><div><span>{t.soilTemp}</span><b>{selected.temp}°C</b></div><div><span>{t.vigorShort}</span><b>{selected.ndvi}</b></div></div><p>{view === 'practical' ? selected.note : selected.tech}</p></div>}
      </div>}
    </section>
  }

  const renderDashboard = () => <>
    <section className="scenario card"><div className="scenario-copy"><div className="title-icon"><span className="icon-tile warning"><CloudLightning size={19}/></span><div><h2>{t.horizon}</h2><p>{t.chooseEvent}</p></div></div><div className="scenario-controls" role="group" aria-label={t.horizon}>{[['today', t.today], ['tomorrow', t.tomorrow], ['72h', t.threeDays]].map(([id, label]) => <button key={id} aria-pressed={horizon === id} onClick={() => setHorizon(id)} className={`chip ${horizon === id ? 'selected' : ''}`}>{label}</button>)}</div>{horizon === '72h' && <div className="event-controls" role="group" aria-label={t.chooseEvent}>{[['heat', Sun, t.heat], ['hail', Cloud, t.hail], ['storm', Wind, t.storm]].map(([id, Icon, label]) => <button key={id} aria-pressed={event === id} className={`event-chip ${event === id ? 'active' : ''}`} onClick={() => setEvent(id)}><Icon size={15}/>{label}</button>)}</div>}</div><div className="scenario-badge"><AlertTriangle size={17}/><span>{horizon === '72h' ? t.scenario : t.demo}</span></div></section>
    {horizon === '72h' && <section className="protection"><div className="protection-icon"><Shield size={20}/></div><div><div className="protection-title"><span>{t.protection}</span><span className="scenario-tag">{t.scenario}</span></div><p>{advice}</p></div></section>}
    <section className="kpi-grid"><Kpi icon={MapPin} label={t.hectares} value={`${totals.hectares.toFixed(1)} ha`} note={`${parcels.length} ${language === 'es' ? 'lotes' : 'plots'}`}/><Kpi icon={Activity} label={t.health} value={`${Math.round(totals.health)}%`} note={t.optimal}/><Kpi icon={Droplets} label={t.moisture} value={`${Math.round(totals.moisture)}%`} note={t.source}/><Kpi icon={Bell} label={t.pending} value={openTasks} note={language === 'es' ? 'Tareas sin completar' : 'Tasks to complete'}/></section>
    <div className="map-grid">{map1 !== 'max' && renderMap(1)}{map2 !== 'max' && renderMap(2)}{map1 === 'max' && renderMap(1)}{map2 === 'max' && renderMap(2)}</div>
    <div className="bottom-grid"><section className="card panel"><div className="section-heading"><div className="title-icon"><span className="icon-tile green"><Leaf size={17}/></span><h2>{t.recs}</h2></div><span className="mode-label">{view === 'practical' ? t.practical : t.technical}</span></div>{recommendations.map((r, i) => <article className={`recommendation ${r.tone}`} key={i}><b>{r.title}</b><p>{r.body}</p></article>)}</section><TaskPanel t={t} language={language} tasks={tasks} toggleTask={toggleTask} fileName={fileName} setFileName={setFileName}/><ChatPanel t={t} language={language} selected={selected} view={view} chat={chat} question={question} setQuestion={setQuestion} sendChat={sendChat}/></div>
  </>

  const renderPage = () => {
    if (tab === 'dashboard') return renderDashboard()
    if (tab === 'farms') return <section className="card page-card"><div className="page-hero"><span className="icon-tile green"><MapPin/></span><div><h2>{t.farmsTitle}</h2><p>{t.farmsBody}</p></div></div>{renderMap(1)}</section>
    if (tab === 'satellite') return <section className="card page-card"><div className="page-hero"><span className="icon-tile blue"><Globe2/></span><div><h2>{t.satelliteMap}</h2><p>{t.layerHint}</p></div></div>{renderMap(2)}</section>
    if (tab === 'crops') return <section className="card page-card"><div className="page-hero"><span className="icon-tile green"><Layers3/></span><div><h2>{t.cropsTitle}</h2><p>{t.cropsBody}</p></div></div><div className="crop-grid">{parcels.map(p => <article className="crop-card" key={p.id}><span className="crop-icon"><Sprout size={18}/></span><div><b>{language === 'en' ? p.cropEn : p.crop}</b><p>{p.name} · {p.hectares.toFixed(1)} ha</p></div><span className={`health-pill ${p.status}`}>{p.health}%</span></article>)}</div><button className="button button-primary" onClick={openParcelModal}><Plus size={16}/>{t.addParcel}</button></section>
    if (tab === 'tasks') return <section className="card page-card"><div className="page-hero"><span className="icon-tile blue"><CalendarDays/></span><div><h2>{t.nav.tasks}</h2><p>{language === 'es' ? 'Organice y marque las tareas del campo.' : 'Organize and complete field tasks.'}</p></div></div><TaskPanel t={t} language={language} tasks={tasks} toggleTask={toggleTask} expanded fileName={fileName} setFileName={setFileName}/></section>
    if (tab === 'history') return <section className="card page-card"><div className="page-hero"><span className="icon-tile blue"><BarChart3/></span><div><h2>{t.historyTitle}</h2><p>{t.historyBody}</p></div></div><div className="notice"><Activity size={18}/><p>{t.sourceBody}</p></div></section>
    return <section className="card page-card"><div className="page-hero"><span className="icon-tile green"><MessageCircle/></span><div><h2>{t.assistant}</h2><p>{t.assistantBody}</p></div></div><ChatPanel t={t} language={language} selected={selected} view={view} chat={chat} question={question} setQuestion={setQuestion} sendChat={sendChat} expanded/></section>
  }

  return <div className="app-shell">
    {mobileNav && <button className="mobile-scrim" aria-label={t.close} onClick={() => setMobileNav(false)}/>}
    <aside className={`sidebar ${mobileNav ? 'open' : ''}`}><div><div className="brand"><div className="brand-mark">TERRA<span>+</span></div><div><b>TERRA<span>+</span></b><small>{t.brand}</small></div><button className="mobile-close icon-button" onClick={() => setMobileNav(false)} aria-label={t.close}><X size={18}/></button></div><nav className="nav-list" aria-label={language === 'es' ? 'Navegación principal' : 'Main navigation'}>{nav.map(([id, Icon]) => <button key={id} onClick={() => changeTab(id)} className={`nav-item ${tab === id ? 'active' : ''}`} aria-current={tab === id ? 'page' : undefined}><Icon size={17}/><span>{t.nav[id]}</span></button>)}</nav></div>
      <div className="sidebar-controls"><div className="control-label"><Eye size={14}/>{t.infoStyle}</div><button className={`view-choice ${view === 'practical' ? 'chosen' : ''}`} onClick={() => setView('practical')} aria-pressed={view === 'practical'}>{t.practical}</button><button className={`view-choice ${view === 'technical' ? 'chosen' : ''}`} onClick={() => setView('technical')} aria-pressed={view === 'technical'}>{t.technical}</button><div className="language-row"><span>Idioma / Language</span><div><button onClick={() => setLanguage('es')} aria-pressed={language === 'es'} className={language === 'es' ? 'lang-active' : ''}>ES</button><button onClick={() => setLanguage('en')} aria-pressed={language === 'en'} className={language === 'en' ? 'lang-active' : ''}>EN</button></div></div></div>
    </aside>
    <main className="main-area"><header className="topbar"><button className="mobile-menu icon-button" onClick={() => setMobileNav(true)} aria-label={language === 'es' ? 'Abrir menú' : 'Open menu'}><Menu size={20}/></button><div className="crumb"><span>TERRA+</span><span className="crumb-slash">/</span><b>{title}</b></div><div className="topbar-right"><span className="demo-badge"><span/> {t.demo}</span><span className="user-avatar" aria-hidden="true">RS</span></div></header>
      <div className="content"><div className="page-title"><div><span className="eyebrow">{t.farm} · Cerrillos, Salta</span><h1>{title}</h1><p>{tab === 'dashboard' ? t.welcome : ''}</p></div><div aria-label={t.farm} className="farm-select">Finca San Isidro · Cerrillos, Salta</div></div><div className="demo-notice"><AlertTriangle size={16}/><span>{t.demoLong}</span></div>{renderPage()}<footer className="footer-note"><span><span className="dot"/>{t.demo}</span><span>{t.sourceBody}</span></footer></div>
    </main>
    {modal && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setModal(false) }}><div className="modal" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><span className="eyebrow">TERRA+</span><h2 id="modal-title">{t.create}</h2></div><IconButton label={t.close} onClick={() => setModal(false)}><X size={18}/></IconButton></div><p className="modal-intro">{t.mapNote}</p><form onSubmit={addParcel}><label>{t.name}<input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder={language === 'es' ? 'Ej.: Lote 4 — El Algarrobo' : 'e.g. Plot 4 — The Algarrobo'} /></label><label>{t.area}<input type="number" min="0.1" step="0.1" value={area} onChange={e => setArea(e.target.value)} placeholder="15" /></label><label>{t.cropLabel}<select value={crop} onChange={e => setCrop(e.target.value)}>{crops.map(c => <option key={c} value={c}>{language === 'en' ? cropsEn[c] : c}</option>)}</select></label>{error && <p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="button button-quiet" onClick={() => setModal(false)}>{t.cancel}</button><button type="submit" className="button button-primary"><Plus size={16}/>{t.save}</button></div></form></div></div>}
  </div>
}

function Kpi({ icon: Icon, label, value, note }) {
  return <article className="card kpi"><span className="icon-tile green"><Icon size={18}/></span><div className="kpi-copy"><span>{label}</span><b>{value}</b><small>{note}</small></div></article>
}

function TaskPanel({ t, language, tasks, toggleTask, expanded = false, fileName, setFileName }) {
  return <section className={`card panel task-panel ${expanded ? 'expanded' : ''}`}><div className="section-heading"><div className="title-icon"><span className="icon-tile blue"><CalendarDays size={17}/></span><h2>{t.taskList}</h2></div><span className="task-count">{tasks.filter(x => x.status !== 'done').length}</span></div>{tasks.length === 0 && <p className="muted-text">{t.noTasks}</p>}<div className="task-list">{tasks.map(task => <article className={`task-row ${task.status === 'done' ? 'task-done' : ''}`} key={task.id}><div className="task-check">{task.status === 'done' && <Check size={13}/>}</div><div className="task-text"><b>{language === 'en' ? task.titleEn : task.title}</b><span>{language === 'en' ? task.detailEn : task.detail}</span></div><button className={`task-status ${task.status}`} onClick={() => toggleTask(task.id)} aria-label={task.status === 'done' ? t.done : t.markDone} aria-pressed={task.status === 'done'}>{task.status === 'done' ? t.done : task.status === 'progress' ? t.inProgress : t.pendingTag}</button></article>)}</div><div className="file-demo"><label className="button button-quiet file-button"><FileUp size={14}/>{t.upload}<input type="file" accept="image/*,.pdf,.csv,.xlsx,.xls" onChange={e => setFileName(e.target.files?.[0]?.name || '')}/></label><span>{fileName || t.fileNote}</span></div></section>
}

function ChatPanel({ t, language, selected, view, chat, question, setQuestion, sendChat, expanded = false }) {
  return <section className={`card panel chat-panel ${expanded ? 'expanded' : ''}`}><div className="section-heading"><div className="title-icon"><span className="icon-tile green"><MessageCircle size={17}/></span><h2>{t.assistant}</h2></div><span className="demo-mini">DEMO</span></div><p className="chat-disclaimer">{t.assistantBody}</p><div className="chat-messages" aria-live="polite">{chat.length === 0 && <div className="chat-welcome">{language === 'es' ? 'Hola. Preguntame por el lote seleccionado y te muestro una respuesta de ejemplo.' : 'Hello. Ask about the selected plot to see a sample reply.'}</div>}{chat.map((item, i) => <div key={i}><div className="chat-question">{item.q}</div><div className="chat-answer">{item.answer}</div></div>)}</div><form className="chat-form" onSubmit={sendChat}><input value={question} onChange={e => setQuestion(e.target.value)} placeholder={t.ask} aria-label={t.ask}/><button className="button button-primary" aria-label={t.send}><Send size={16}/></button></form></section>
}

export default App
