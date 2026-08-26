'use client';

import { useEffect, useState } from 'react';

/* =========================================================
   CARTAS
========================================================= */

const ADMINS = ['Rexitoo', 'alex96', 'Redsam', 'Poke589', 'Faxzer0', 'ikerglz_'];

const N = [
  // CURA Y APOYO
  {
    n: 'Objeto curativo',
    c: 'Cura',
    p: 1,
    d: 'Permite al jugador comprar un objeto curativo en la tienda(Abrir ticket).',
  },
  {
    n: 'Dama de la cura',
    c: 'Cura',
    p: 3,
    d: 'Puedes comprar hasta 5 objetos curativos por tramo (máximo 1 Dama de la Cura por tramo)-(Abrir ticket para comprobación).',
  },
  {
    n: 'Amor para dar',
    c: 'Cura',
    p: 1,
    d: 'Permite a otro jugador de tu elección comprar un objeto curativo(Abrir ticket).',
  },
  {
    n: 'Ayuda del coach',
    c: 'Cura',
    p: 2,
    d: 'Tu coach puede ayudarte durante 1 turno (máximo 2 min).',
  },
  {
    n: 'Tiro de ruleta',
    c: 'Cura',
    p: 5,
    d: 'El jugador puede lanzar la ruleta de su tramo y obtener sus recompensas.(Abrir ticket)',
  },

  // CAPTURAS
  {
    n: 'Skip Pokémon',
    c: 'Capturas',
    p: 5,
    d: 'Puedes saltarte hasta tres encuentros en una ruta (te quedas con el cuarto)-(Abrir ticket).',
  },
  {
    n: 'Recaptura',
    c: 'Capturas',
    p: 7,
    d: 'Puedes recapturar en una ruta (no Pokémon ya atrapados)-(Abrir ticket)',
  },
  {
    n: 'Reroll Salvaje',
    c: 'Capturas',
    p: 2,
    d: 'Usa este comodín cuando tu primer Pokémon de ruta no te convence. Este comodín te permite saltar ese Pokémon y tienes una nueva oportunidad de primer Pokémon de ruta.(Abrir ticket)',
  },

  // ELEGIDO
  {
    n: 'Revivir al elegido',
    c: 'Elegido',
    p: 7,
    d: 'Puedes revivir a tu Pokémon elegido. Tu Pokémon elegido puede revivir más de una vez(Abrir ticket para comprobación).',
  },
  {
    n: 'Totem del elegido',
    c: 'Elegido',
    p: 6,
    d: 'Recibes un objeto especial llamado Tótem. El objeto debe permanecer equipado en tu pokemon elegido para aplicar el siguiente efecto: Si la vida del pokemon llega a 0, dicha muerte no cuenta, al usar el efecto del totem debes tirarlo(Abrir ticket).'
  },
  {
    n: 'Prime',
    c: 'Elegido',
    p: 3,
    d: 'Si tu inicial estuvo durante todo el tramo en tu equipo y no murió ni una sola vez, este Pokémon recibirá 31 IVs en todas sus características. Si lo haces una segunda vez, tu Elegido se convertirá en shiny. Este comodín debe usarse al inicio del tramo(Abrir ticket).',
  },

  // ATAQUE
  {
    n: 'Robo de Objeto curativo',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Especial',
    d: 'Roba tres objetos curativos a un participante. Solo disponible en ruleta de tramo (Abrir ticket).',
  },
  {
    n: 'Desgaste',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Fuerte',
    d: 'Obliga a un jugador a no poder meter ni sacar nada de su equipo hasta que se le muera un Pokémon. Solo disponible en ruleta de tramo (Abrir ticket).',
  },
  {
    n: 'Elección Fatal',
    c: 'Ataque',
    p: 9,
    tipoAtaque: 'Fuerte',
    d: 'Escoge dos Pokémon del rival; este deberá liberar uno(Abrir ticket).',
  },
  {
    n: 'Liberar Pokémon',
    c: 'Ataque',
    p: 7,
    tipoAtaque: 'Fuerte',
    d: 'Otro jugador pierde un pokemon al azar de su equipo(Abrir ticket).',
  },
  {
    n: 'Toque de la Muerte',
    c: 'Ataque',
    p: 11,
    tipoAtaque: 'Fuerte',
    d: 'Escoge un Pokémon de otro jugador; este deberá liberarlo(Abrir ticket).',
  },
  {
    n: 'Robo de Pokémon',
    c: 'Ataque',
    p: 20,
    tipoAtaque: 'Fuerte',
    d: 'Roba el Pokémon que quieras de otro jugador(Abrir ticket).',
  },
  {
    n: 'Llamada del Team Rocket',
    c: 'Ataque',
    p: 9,
    tipoAtaque: 'Fuerte',
    d: 'Robas un Pokémon aleatorio a otro jugador(Abrir ticket).',
  },
  {
    n: 'Mismo Destino',
    c: 'Ataque',
    p: 7,
    tipoAtaque: 'Medio',
    d: 'Libera un Pokémon tuyo; otro jugador deberá liberar un Pokémon del mismo tipo-(Abrir ticket).',
  },
  {
    n: 'Bloqueo Pokémon',
    c: 'Ataque',
    p: 7,
    tipoAtaque: 'Medio',
    d: 'Escoge un pokemon de otro jugador que no podrá usar ese tramo.(El efecto termina en el jefe de tramo es decir, en ese combate podrá usarlo ya)-(Abrir ticket).',
  },
  {
    n: 'Destructor',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Fuerte',
    d: 'Obliga a un jugador a continuar con 5 pokemon el restodel tramo.(el efecto termina en el jefe de tramo, es decir en ese combate puedes usarlo ya). Solo disponible en ruleta de tramo (Abrir ticket)',
  },
  {
    n: 'Robo de Comodín',
    c: 'Ataque',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Fuerte',
    d: 'Robas un comodín a elección de los que tiene en el inventario otro participante. Solo disponible en ruleta de tramo (Abrir ticket).',
  },

  // REVIVIR
  {
    n: 'Revivir Pokémon',
    c: 'Revivir',
    p: 10,
    d: 'Trae de vuelta a la vida a un Pokémon muerto escribiendo su nombre. Solo se puede usar una vez por Pokémon (Abrir ticket para comprobación).',
  },
  {
    n: 'Totem',
    c: 'Revivir',
    p: 8,
    d: 'Recibes un objeto especial llamado Tótem. El objeto debe permanecer equipado en un pokemon para aplicar el siguiente efecto: Si la vida del pokemon llega a 0, dicha muerte no cuenta, al usar el efecto del totem debes tirarlo.(Abrir ticket)'
  },
  {
    n: 'Mega Revivir',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Revive hasta 5 Pokémon (recuerda que un Pokémon solo puede revivir una vez). Solo disponible en ruleta de tramo (Abrir ticket para comprobación).',
  },
  {
    n: 'Bendición celestial',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Eres inmune al próximo combate. No mueren pokemon ni aumenta el contador de muertes.(este efecto es único, no hasta que logres pasar ese combate(Mencionar a un staff). Solo disponible en ruleta de tramo',
  },
  {
    n: 'Escudo protector',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Bloquea el próximo ataque recibido. Se activa si tu lo deseas y se mantiene hasta recibir un ataque o ser retirado por los administradores. Solo disponible en ruleta de tramo',
  },
  {
    n: 'Reversa',
    c: 'Revivir',
    p: 0,
    soloRuleta: true,
    d: 'Usa este comodín para activar tu escudo protector. Si te atacan, el ataque rebota, se devuelve al atacante y te quedas con su carta de ataque.',
  },

  // ECONOMÍA
  {
    n: 'Moneda',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Recibes una moneda. Solo disponible en ruleta de tramo',
  },
  {
    n: '3 Monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Recibes 3 monedas. Solo disponible en ruleta de tramo',
  },
  {
    n: 'Robo de Monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    tipoAtaque: 'Especial',
    d: 'Robas 5 monedas a otro participante. Solo disponible en ruleta de tramo',
  },
  {
    n: 'Venta Ilegal',
    c: 'Economía',
    p: 0,
    d: 'Selecciona un Pokémon y recibe 2 monedas. Ese Pokémon no podrá volver a ser objetivo de este comodín.',
    soloUso: true,
    infinito: true,
  },
  {
    n: 'Venta ilegal de lujo',
    c: 'Economía',
    p: 0,
    d: 'Selecciona un Pokémon y recibe 2 monedas. Ese Pokémon no podrá volver a ser objetivo de este comodín.',
    soloUso: true,
    infinito: true,
  },
  {
    n: 'Monedero perdido',
    c: 'Economía',
    p: 0,
    soloRuleta: true, 
    d: 'Recibes entre 1 y 5 monedas aleatoriamente. Solo disponible en ruleta de tramo',
  },
  {
    n: '5 monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Obtienes 5 monedas. Solo disponible en ruleta de tramo'
  },
  {
    n: '10 monedas',
    c: 'Economía',
    p: 0,
    soloRuleta: true,
    d: 'Obtienes 10 monedas. Solo disponible en ruleta de tramo'
  },

  // OBJETOS
  {
    n: 'Masterball',
    c: 'Objetos',
    p: 1,
    d: 'Obtienes una Masterball.(Abrir ticket)',
  },
  {
    n: 'Compra de MT',
    c: 'Objetos',
    p: 1,
    d: 'Permite comprar una MT de cualquiera de las tiendas disponibles.(Abrir ticket)',
  },
  {
    n: 'Capsula Habilidad',
    c: 'Objetos',
    p: 4,
    d: 'Cambia la habilidad de tu Pokémon por su habilidad secundaria.(Abrir ticket)',
  },
  {
    n: 'Piedra Evolutiva',
    c: 'Objetos',
    p: 3,
    d: 'Obtienes una piedra evolutiva a elección.(Abrir ticket)',
  },
  {
    n: 'Mega Piedra',
    c: 'Objetos',
    p: 5,
    d: 'Escoge una megapiedra a elección.(Abrir ticket)',
  },
  {
    n: 'Objeto Débil',
    c: 'Objetos',
    p: 2,
    d: 'Puedes obtener un objeto competitivo básico.(Abrir ticket)',
  },
  {
    n: 'Objeto Fuerte',
    c: 'Objetos',
    p: 3,
    d: 'Permite comprar un objeto competitivo poderoso.(Abrir ticket)',
  },
  {
    n: 'Permiso de Pokeballs',
    c: 'Objetos',
    p: 1,
    d: 'Usa este comodín para comprar hasta 15 pokeballs de la manera que desees en el centro comercial de Ciudad Calagua, Ciudad Malvalona...(Abrir ticket)',
  },

  // ESTADÍSTICAS Y MEJORAS
  {
    n: 'Naturaleza neutra',
    c: 'Estadísticas y mejoras',
    p: 0,
    soloRuleta: true,
    d: 'Cambia la naturaleza de un pokemon a neutra. Solo disponible en ruleta de tramo (Abrir ticket)',
  },

  // CONDICIONAL
  {
    n: 'Token Bancario',
    c: 'Condicional',
    p: 5,
    d: 'Consigues 15 monedas el siguiente tramo(Mantener durante el tramo de compra y al completar el tramo avisar a un staff)',
  },
  {
    n: 'Robo Justo',
    c: 'Condicional',
    p: 20, 
    tipoAtaque: 'Fuerte',
    d: 'Requiere tener al menos 3 de experiencia para comprarse. Al llegar a 4 de experiencia te llega uno gratis al buzón. Puedes robar un pokemon a otro participante(Abrir ticket)',
  },
  {
    n: 'Apuesta segura',
    c: 'Condicional',
    p: 5,
    d: 'Si ganas el combate de jefe de tramo(líder de gimnasio) con solo una baja o ninguna obtienes 10 monedas.(Abrir ticket)',
  },
];

const CARTAS = N.map((x, i) => ({
  id: String(i + 1),
  cat: x.c,
  nombre: x.n,
  precio: x.p,
  desc: x.d,
  soloRuleta: Boolean((x as any).soloRuleta),
  tipoAtaque: (x as any).tipoAtaque,
  soloUsoUnico: Boolean((x as any).soloUsoUnico),
}));

/* =========================================================
   PARTICIPANTES
========================================================= */

const PT_INICIAL = [
  'Tiosanto',
  'Rexitoo',
  'Redsam',
  'faxzer0',
  'alex96',
  '_Crema',
  'ikerglz_',
  'Poke589',
  'Yeibrami',
  'Faze_Pedro2009',
  'Pedro2707',
  'gogobaneado',
  'enriquepastor11',
  'imxteoxyz',
  'Pewpew',
  'Niyhu',
  'Minimuesli',
  'TheMaxis',
  'frannsann',
  'Ima',
  'Uligremh3',
  'Thiagoo',
  'SebasEmperor',
  'Demonn1',
].map((u, i) => ({
  usuario: u,
  contrasena: i === 0 ? 'tio123' : u.toLowerCase().replace('_', '') + '123',
  monedas: 20,
  compras: [],
  escudoActivo: false,
  reversaActiva: false,
  revivirUsados: [],
  ventaIlegalUsados: [],
  ventaIlegalLujoUsados: [],
  karma: 1,
  experiencia: 0,
  roboJustoCompradoTramo: false,
  equipo: [],
  buzon: [
    {
      id: 1,
      emisor: 'Admin (Rexitoo)',
      mensaje: '¡Bienvenido al Desafío Pokémon! Revisa el Historial Global en la sección de inicio.',
      fecha: 'Hoy, 10:00',
      leido: false,
    },
  ],
}));

/* =========================================================
   COMPONENTE
========================================================= */

export default function DesafioPokemonApp() {
  const [ps, setPs] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('desafio_pokemon_ps');
      if (saved) {
        try { return JSON.parse(saved); } catch { return PT_INICIAL; }
      }
    }
    return PT_INICIAL;
  });

  // HISTORIAL GLOBAL COMPARTIDO
  const [historialGlobal, setHistorialGlobal] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('desafio_historial_global');
      if (saved) {
        try { return JSON.parse(saved); } catch { return []; }
      }
    }
    return [];
  });

  const [lg, setLg] = useState<any>(null);
  const [inputUser, setInputUser] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [seccionActual, setSeccionActual] = useState('INICIO');
  const [cartaModal, setCartaModal] = useState<any>(null);
  const [ataqueObjetivoUser, setAtaqueObjetivoUser] = useState('');
  const [notificacion, setNotificacion] = useState({ texto: '', visible: false });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('desafio_pokemon_ps', JSON.stringify(ps));
    }
  }, [ps]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('desafio_historial_global', JSON.stringify(historialGlobal));
    }
  }, [historialGlobal]);

  const registrarHistorialGlobal = (tipo: string, descripcion: string) => {
    const nuevoEvento = {
      id: Date.now(),
      tipo,
      descripcion,
      fecha: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    setHistorialGlobal((prev) => [nuevoEvento, ...prev]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const usuario = inputUser.trim().toLowerCase();
    const encontrado = ps.find((u) => u.usuario.toLowerCase() === usuario && u.contrasena === inputPass);
    if (encontrado) {
      setLg(encontrado);
      setLoginError('');
      setInputPass('');
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setLg(null);
    setInputUser('');
    setInputPass('');
    setSeccionActual('INICIO');
  };

  const mostrarNotificacion = (msg: string) => {
    setNotificacion({ texto: msg, visible: true });
    setTimeout(() => setNotificacion({ texto: '', visible: false }), 4000);
  };

  const comprar = (carta: any) => {
    if (carta.infinito || carta.soloUso) {
      mostrarNotificacion('🔒 Este comodín no se puede comprar.');
      return;
    }
    if (carta.soloRuleta || (carta.cat === 'Economía' && carta.nombre !== 'Robo Justo')) {
      mostrarNotificacion('🎰 Solo disponible en la Ruleta de Tramo');
      return;
    }
    let precioFinal = carta.precio;
    if (carta.nombre === 'Robo Justo') {
      if (lg.experiencia < 3) {
        mostrarNotificacion('❌ Necesitas al menos 3 de experiencia.');
        return;
      }
      if (lg.roboJustoCompradoTramo) {
        mostrarNotificacion('❌ Ya has comprado este comodín este tramo.');
        return;
      }
      precioFinal = lg.experiencia >= 3 ? 3 : 20;
    }
    if (lg.monedas < precioFinal) {
      mostrarNotificacion('❌ No tienes suficientes monedas');
      return;
    }

    const actualizados = ps.map((x) => {
      if (x.usuario === lg.usuario) {
        return {
          ...x,
          monedas: x.monedas - precioFinal,
          compras: [...(x.compras || []), carta.nombre],
          roboJustoCompradoTramo: carta.nombre === 'Robo Justo' ? true : x.roboJustoCompradoTramo,
        };
      }
      return x;
    });

    setPs(actualizados);
    setLg(actualizados.find((x) => x.usuario === lg.usuario));
    
    registrarHistorialGlobal('COMPRA', `${lg.usuario} compró la carta [${carta.nombre}] por ${precioFinal} monedas.`);
    
    mostrarNotificacion(`Comprado con Éxito\nHas comprado ${carta.nombre}`);
  };

  const usarCarta = (nombreCarta: string) => {
    const comprasActuales = lg.compras || [];
    const cartaDef = CARTAS.find((c) => c.nombre.toLowerCase() === nombreCarta.toLowerCase());

    if (nombreCarta.toLowerCase() === 'escudo protector') {
      const index = comprasActuales.findIndex((c: string) => c.toLowerCase() === nombreCarta.toLowerCase());
      if (index === -1) { mostrarNotificacion('❌ No tienes esta carta.'); return; }
      if (lg.escudoActivo) { mostrarNotificacion('⚠️ Ya tienes un Escudo activo.'); return; }
      
      const nuevasCompras = [...comprasActuales]; nuevasCompras.splice(index, 1);
      const actualizados = ps.map((x) => x.usuario === lg.usuario ? { ...x, compras: nuevasCompras, escudoActivo: true } : x);
      
      setPs(actualizados); setLg(actualizados.find((x) => x.usuario === lg.usuario)); setCartaModal(null);
      registrarHistorialGlobal('DEFENSA', `${lg.usuario} activó su [Escudo protector].`);
      mostrarNotificacion('🛡️ ¡Escudo protector activado!');
      return;
    }

    if (nombreCarta.toLowerCase() === 'reversa') {
      const index = comprasActuales.findIndex((c: string) => c.toLowerCase() === nombreCarta.toLowerCase());
      if (index === -1) { mostrarNotificacion('❌ No tienes esta carta.'); return; }
      if (lg.reversaActiva) { mostrarNotificacion('⚠️ Ya tienes Reversa activa.'); return; }

      const nuevasCompras = [...comprasActuales]; nuevasCompras.splice(index, 1);
      const actualizados = ps.map((x) => x.usuario === lg.usuario ? { ...x, compras: nuevasCompras, reversaActiva: true } : x);
      
      setPs(actualizados); setLg(actualizados.find((x) => x.usuario === lg.usuario)); setCartaModal(null);
      registrarHistorialGlobal('DEFENSA', `${lg.usuario} activó su carta [Reversa].`);
      mostrarNotificacion('🔄 ¡Reversa activada!');
      return;
    }

    if (cartaDef?.cat === 'Ataque' || nombreCarta.toLowerCase() === 'robo de monedas' || nombreCarta.toLowerCase() === 'robo de comodín') {
      if (!ataqueObjetivoUser) { mostrarNotificacion('⚠️ Selecciona un objetivo.'); return; }
      if (ataqueObjetivoUser.toLowerCase() === lg.usuario.toLowerCase()) { mostrarNotificacion('❌ No puedes atacarte a ti mismo.'); return; }
      const objetivoUser = ps.find((x) => x.usuario.toLowerCase() === ataqueObjetivoUser.toLowerCase());
      if (!objetivoUser) { mostrarNotificacion('❌ Objetivo no encontrado.'); return; }

      const indexPropio = comprasActuales.findIndex((c: string) => c.toLowerCase() === nombreCarta.toLowerCase());
      if (indexPropio === -1) { mostrarNotificacion('❌ No tienes esta carta en tu inventario.'); return; }

      if (objetivoUser.reversaActiva) {
        const nuevasComprasPropias = [...comprasActuales]; nuevasComprasPropias.splice(indexPropio, 1);
        const comprasDefensor = [...(objetivoUser.compras || []), nombreCarta];
        
        const actualizados = ps.map((x) => {
          if (x.usuario === lg.usuario) return { ...x, compras: nuevasComprasPropias, karma: Math.max(0, x.karma - 1) };
          if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
            return { ...x, reversaActiva: false, compras: comprasDefensor, experiencia: Math.min(4, x.experiencia + 1), karma: x.karma + 1 };
          }
          return x;
        });
        setPs(actualizados); setLg(actualizados.find((x) => x.usuario === lg.usuario));
        setAtaqueObjetivoUser(''); setCartaModal(null);

        registrarHistorialGlobal('REBOTE', `${lg.usuario} atacó a ${objetivoUser.usuario} con [${nombreCarta}], ¡pero la [Reversa] de ${objetivoUser.usuario} devolvió el ataque y se quedó con la carta!`);
        mostrarNotificacion(`🔄 ¡Reversa activada! El ataque rebotó en ${objetivoUser.usuario}.`);
        return;
      }

      if (objetivoUser.escudoActivo) {
        const nuevasComprasPropias = [...comprasActuales]; nuevasComprasPropias.splice(indexPropio, 1);

        const actualizados = ps.map((x) => {
          if (x.usuario === lg.usuario) return { ...x, compras: nuevasComprasPropias };
          if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
            return { ...x, escudoActivo: false, experiencia: Math.min(4, x.experiencia + 1), karma: x.karma + 1 };
          }
          return x;
        });
        setPs(actualizados); setLg(actualizados.find((x) => x.usuario === lg.usuario));
        setAtaqueObjetivoUser(''); setCartaModal(null);

        registrarHistorialGlobal('BLOQUEO', `${lg.usuario} intentó atacar a ${objetivoUser.usuario} con [${nombreCarta}], pero el [Escudo protector] de ${objetivoUser.usuario} lo bloqueó.`);
        mostrarNotificacion(`🛡️ ¡Escudo bloqueó el ataque de ${lg.usuario}!`);
        return;
      }

      const nuevasComprasPropias = [...comprasActuales]; nuevasComprasPropias.splice(indexPropio, 1);
      
      const actualizados = ps.map((x) => {
        if (x.usuario === lg.usuario) return { ...x, compras: nuevasComprasPropias, karma: Math.max(0, x.karma - 1) };
        if (x.usuario.toLowerCase() === objetivoUser.usuario.toLowerCase()) {
          return { ...x, experiencia: Math.min(4, x.experiencia + 1), karma: x.karma + 1 };
        }
        return x;
      });
      setPs(actualizados); setLg(actualizados.find((x) => x.usuario === lg.usuario));
      setAtaqueObjetivoUser(''); setCartaModal(null);

      registrarHistorialGlobal('ATAQUE', `${lg.usuario} atacó a ${objetivoUser.usuario} utilizando la carta [${nombreCarta}] con éxito.`);
      mostrarNotificacion(`⚔️ ¡Ataque exitoso contra ${objetivoUser.usuario}!`);
      return;
    }

    registrarHistorialGlobal('USO', `${lg.usuario} usó la carta [${nombreCarta}].`);
    mostrarNotificacion(`Has usado la carta ${nombreCarta}`);
  };

  if (!lg) {
    return (
      <div className="flex h-screen w-screen bg-[#2a0028] items-center justify-center p-4 select-none font-sans">
        <form onSubmit={handleLogin} className="bg-[#111116] border border-slate-800 p-8 rounded-3xl w-full max-w-sm flex flex-col gap-5 shadow-2xl">
          <div className="flex flex-col items-center gap-1">
            <div className="bg-yellow-400 text-black font-black italic px-4 py-1.5 rounded text-center text-sm uppercase">
              DESAFÍO <span className="block text-xs text-red-600">POKÉMON</span>
            </div>
          </div>
          {loginError && <div className="bg-red-500/20 text-red-300 text-xs p-2 rounded text-center font-bold">{loginError}</div>}
          <input type="text" value={inputUser} onChange={(e) => setInputUser(e.target.value)} placeholder="Usuario" required className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs" />
          <input type="password" value={inputPass} onChange={(e) => setInputPass(e.target.value)} placeholder="Contraseña" required className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs" />
          <button type="submit" className="py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black text-xs rounded-xl uppercase">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#2a0028] text-white font-sans overflow-hidden select-none">
      {/* SIDEBAR */}
      <aside className="w-56 bg-[#111116] flex flex-col justify-between p-4 border-r border-slate-800 shrink-0">
        <div className="flex flex-col gap-6">
          <div className="bg-yellow-400 text-black font-black italic px-3 py-1 rounded text-center text-xs uppercase">
            DESAFÍO <span className="block text-[10px] text-red-600">POKÉMON</span>
          </div>
          <nav className="flex flex-col gap-2 text-xs font-bold">
            {[
              { id: 'INICIO', label: 'INICIO', icon: '🏠' },
              { id: 'PARTICIPANTES', label: 'PARTICIPANTES', icon: '👥' },
              { id: 'COMODINES', label: 'COMODINES', icon: '🎴' },
              { id: 'BUZÓN', label: 'BUZÓN', icon: '📬' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSeccionActual(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  seccionActual === item.id ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
          <span className="text-xs font-black text-white">{lg.usuario}</span>
          <span className="text-[10px] text-yellow-300 font-bold">🪙 {lg.monedas} monedas</span>
          <button onClick={handleLogout} className="text-[10px] text-red-400 font-bold pt-1 border-t border-slate-800">Cerrar Sesión</button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-gradient-to-br from-[#4a0043] via-[#240022] to-[#120015] p-6 overflow-y-auto flex flex-col items-center relative">
        
        {seccionActual === 'INICIO' && (
          <div className="w-full max-w-4xl flex flex-col gap-6">
            <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
              <h1 className="text-xl font-black text-white">¡Hola, {lg.usuario}! 👋</h1>
              <p className="text-xs text-pink-200 mt-1">Aquí abajo puedes ver el historial global con las acciones, compras y ataques de todos los participantes del servidor en tiempo real.</p>
            </div>

            {/* HISTORIAL GLOBAL INTEGRADO EN INICIO */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-lg font-black text-pink-400 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
                📜 Historial Global de la Partida
              </h2>
              <div className="flex flex-col gap-3 max-h-[55vh] overflow-y-auto pr-2">
                {historialGlobal.map((h: any) => (
                  <div key={h.id} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-start justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded uppercase font-bold">{h.tipo}</span>
                        <span className="text-[10px] text-slate-500">{h.fecha}</span>
                      </div>
                      <p className="text-slate-200 font-medium">{h.descripcion}</p>
                    </div>
                  </div>
                ))}
                {historialGlobal.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Aún no hay registros en el historial global. ¡Realiza compras o ataques para verlos aquí!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {seccionActual === 'PARTICIPANTES' && (
          <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-black text-pink-400 border-b border-slate-800 pb-3 mb-6">👥 Panel de Participantes</h2>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Participante</th>
                  <th className="py-3 px-4">Monedas</th>
                  <th className="py-3 px-4">Comodines en inventario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {ps.map((p) => (
                  <tr key={p.usuario} className="hover:bg-slate-950/50">
                    <td className="py-4 px-4 font-black text-white">{p.usuario}</td>
                    <td className="py-4 px-4 font-bold text-yellow-300">{p.monedas} 🪙</td>
                    <td className="py-4 px-4 text-slate-400">{(p.compras || []).length} comodines</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {seccionActual === 'COMODINES' && (
          <div className="w-full max-w-5xl bg-white text-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
              <span className="font-black text-lg">🎴 Catálogo de Comodines</span>
              <span className="text-xs font-bold text-yellow-600">🪙 {lg.monedas}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto p-2">
              {CARTAS.map((carta) => (
                <div key={carta.id} onClick={() => setCartaModal(carta)} className="cursor-pointer bg-slate-100 p-3 rounded-xl border border-slate-300 hover:shadow-lg transition">
                  <div className="font-bold text-xs">{carta.nombre}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Cat: {carta.cat}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL CARTA */}
        {cartaModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setCartaModal(null)}>
            <div className="bg-[#0e0c12] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4 text-white" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-black text-pink-400">{cartaModal.nombre}</h3>
              <p className="text-xs text-slate-300">{cartaModal.desc}</p>
              
              {(cartaModal.cat === 'Ataque' || cartaModal.nombre.toLowerCase() === 'robo de comodín') && (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-pink-400 font-bold">Seleccionar Objetivo</label>
                  <select value={ataqueObjetivoUser} onChange={(e) => setAtaqueObjetivoUser(e.target.value)} className="bg-slate-900 border border-slate-700 p-2 rounded text-xs text-white">
                    <option value="">-- Elige un jugador --</option>
                    {ps.filter(p => p.usuario !== lg.usuario).map(p => (
                      <option key={p.usuario} value={p.usuario}>{p.usuario}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button onClick={() => usarCarta(cartaModal.nombre)} className="flex-1 py-2.5 bg-amber-500 text-black font-black text-xs rounded-xl">USAR</button>
                <button onClick={() => comprar(cartaModal)} className="flex-1 py-2.5 bg-emerald-600 text-white font-black text-xs rounded-xl">COMPRAR</button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICACIÓN */}
        {notificacion.visible && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-2xl text-xs font-black z-[100]">
            {notificacion.texto}
          </div>
        )}
      </main>
    </div>
  );
}
