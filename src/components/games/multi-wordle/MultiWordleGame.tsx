import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Grid3X3, Hash } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Word lists per language
const WORD_LISTS: Record<string, string[]> = {
  en: ['ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DERBY', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DREAM', 'DRESS', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PHASE', 'PHONE', 'PHOTO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RIGHT', 'RIVAL', 'RIVER', 'ROBIN', 'ROBOT', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED', 'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'],
  es: ['ABAJO', 'ABRIR', 'ACTOR', 'AGUDO', 'AHORA', 'ALBUM', 'ALTAR', 'AMIGO', 'ANDAR', 'ANGEL', 'ANIMO', 'APOYO', 'ARBOL', 'AROMA', 'ASADO', 'ATRAS', 'AUTOR', 'AVION', 'AYUDA', 'BAILE', 'BANCO', 'BARCO', 'BEBER', 'BELLO', 'BESAR', 'BICHO', 'BLANCO', 'BOCA', 'BOLSA', 'BORDE', 'BOSQUE', 'BRAZO', 'BRISA', 'BROMA', 'BUENO', 'BURLA', 'CABRA', 'CAJON', 'CALOR', 'CAMPO', 'CANAL', 'CANTO', 'CARNE', 'CARRO', 'CARTA', 'CASAR', 'CAUSA', 'CELOSO', 'CERCA', 'CHICO', 'CIELO', 'CINCO', 'CIUDAD', 'CLARO', 'CLASE', 'COBRA', 'COCHE', 'COLOR', 'COMER', 'CORAL', 'CORAZON', 'CORTO', 'COSA', 'CREAR', 'CRUZ', 'CUOTA', 'DANZA', 'DEBER', 'DECIR', 'DEDOS', 'DEJAR', 'DENSO', 'DESEO', 'DICHA', 'DIETA', 'DINERO', 'DOBLE', 'DOLOR', 'DONDE', 'DORMIR', 'DUENO', 'DULCE', 'DURAR', 'EBANO', 'EDAD', 'EFECTO', 'EGIPCIO', 'EJEMPLO', 'ELEGIR', 'EMPEZAR', 'ENANO', 'ENERO', 'ENFERMO', 'ENOJAR', 'ENSAYO', 'ENTERO', 'ENVIAR', 'EPOCA', 'EQUIPO', 'ERROR', 'ESCALA', 'ESCENA', 'ESFERA', 'ESPACIO', 'ESPEJO', 'ESTADO', 'ESTAR', 'ESTE', 'ESTILO', 'EXITO', 'FALDA', 'FALSO', 'FAMILIA', 'FARO', 'FAVOR', 'FECHA', 'FELIZ', 'FERIA', 'FICHA', 'FIEbre', 'FILA', 'FINAL', 'FIRMA', 'FLOR', 'FONDO', 'FORMA', 'FRASE', 'FRENTE', 'FRIO', 'FRUTA', 'FUEGO', 'FUENTE', 'FUERA', 'FUTURO', 'GANAR', 'GASTO', 'GATO', 'GENIO', 'GENTE', 'GESTO', 'GIRAR', 'GLOBO', 'GOLPE', 'GORDO', 'GRADO', 'GRANO', 'GRATO', 'GRAVE', 'GRITO', 'GRUPO', 'GUARDAR', 'GUERRA', 'GUIA', 'GUSTO', 'HABER', 'HABLA', 'HACER', 'HACHA', 'HAMBRE', 'HASTA', 'HECHO', 'HERIR', 'HEROE', 'HIELO', 'HOJA', 'HONGO', 'HONOR', 'HORNO', 'HUESO', 'HUEVO', 'HUMOR', 'IDEAL', 'IGLESIA', 'IGUAL', 'IMPAR', 'INDIO', 'INFANTIL', 'INGLES', 'INMENSO', 'INTENTO', 'ISLA', 'JABON', 'JAMAS', 'JARDIN', 'JEFE', 'JOVEN', 'JUEGO', 'JUGAR', 'JUNIO', 'JUSTO', 'LABIO', 'LADO', 'LAGO', 'LAMPA', 'LANZA', 'LARGO', 'LASER', 'LATIN', 'LAVAR', 'LECHE', 'LEER', 'LEGUA', 'LENGUA', 'LENTE', 'LETRA', 'LIBRO', 'LIMON', 'LINDO', 'LINEA', 'LISTA', 'LLAVE', 'LLENO', 'LLORAR', 'LUCHA', 'LUEGO', 'LUNAR', 'LUNES', 'LUZ', 'MADRE', 'MAGIA', 'MALO', 'MAMUT', 'MANCO', 'MANDO', 'MANERA', 'MANGO', 'MANO', 'MAPA', 'MARCA', 'MAREA', 'MARZO', 'MASA', 'MATAR', 'MAYOR', 'MEDIR', 'MEJOR', 'MEMORIA', 'MENOR', 'MENTE', 'MENTIR', 'MERMA', 'MES', 'META', 'METRO', 'MIEDO', 'MIEL', 'MILLA', 'MINA', 'MINUTO', 'MIRAR', 'MISMO', 'MITAD', 'MODELO', 'MOJAR', 'MOLDE', 'MONTA', 'MORAL', 'MORIR', 'MOSTO', 'MOTOR', 'MOVER', 'MUCHO', 'MUERTE', 'MUJER', 'MUNDO', 'MUSICA', 'NACER', 'NARIZ', 'NATURAL', 'NAVE', 'NECIO', 'NEGRO', 'NERVIO', 'NEVAR', 'NIEVE', 'NINJA', 'NIVEL', 'NOBLE', 'NOCHE', 'NOMBRAR', 'NORMA', 'NORTE', 'NOTA', 'NOVELA', 'NUEVE', 'NUEVO', 'NUMERO', 'NUNCA', 'OASIS', 'OBRA', 'OBRERO', 'OCEANO', 'OCHO', 'ODIAR', 'OESTE', 'OFICIO', 'OGRO', 'OIDO', 'OJALA', 'OJOS', 'OLA', 'OLER', 'OLVIDO', 'ONCE', 'OPACO', 'OPERA', 'ORAR', 'ORO', 'OSADO', 'OSCAR', 'OSO', 'OTOÑO', 'OVNIS', 'PADRE', 'PAGAR', 'PAIS', 'PAJARO', 'PALMA', 'PAN', 'PAPA', 'Papel', 'PARAR', 'PARED', 'PARIR', 'PARTE', 'PASAR', 'PASEO', 'PASTO', 'PATIO', 'PAUSA', 'PAZ', 'PECHO', 'PEDIR', 'PEGA', 'PELEA', 'PELIGRO', 'PELO', 'PENAR', 'PENSAR', 'PEOR', 'PERDER', 'PERFIL', 'PERRO', 'PESAR', 'PEZ', 'PIANO', 'PIEDRA', 'PIEL', 'PIES', 'PILA', 'PINTA', 'PIÑA', 'PISO', 'PLAN', 'PLATA', 'PLAYA', 'PLAZA', 'PLOMO', 'POBRE', 'POCO', 'PODER', 'POEMA', 'POETA', 'POLLO', 'PONER', 'PORQUE', 'POSEER', 'POSTE', 'POTRO', 'POZO', 'PRADO', 'PREMIO', 'PRESO', 'PRIMA', 'PRIMO', 'PROBAR', 'PROPIO', 'PRUEBA', 'PUEBLO', 'PUERTA', 'PULSO', 'PUNTO', 'PUPILA', 'PURE', 'QUEJA', 'QUESO', 'QUINCE', 'QUITAR', 'RABIA', 'RADIO', 'RAMA', 'RANGO', 'RAPIDO', 'RASGO', 'RATO', 'RAZON', 'REGLA', 'REINA', 'REIR', 'RELOJ', 'REMO', 'RENAL', 'RENO', 'RENTA', 'RETO', 'REY', 'RIEGO', 'RIESGO', 'RIO', 'RITMO', 'ROBAR', 'ROBLE', 'ROBOT', 'ROCA', 'ROJO', 'ROPA', 'ROSA', 'ROTO', 'RUBIO', 'RUDO', 'RUEDA', 'RUIDO', 'RUINA', 'SABER', 'SABIO', 'SACAR', 'SAL', 'SALDO', 'SALIR', 'SALTO', 'SALUD', 'SALVO', 'SANDIA', 'SANO', 'SANTO', 'SARNA', 'SASTRA', 'SECO', 'SECTOR', 'SEDA', 'SEGAR', 'SEGUN', 'SEIS', 'SEÑAL', 'SEÑOR', 'SER', 'SERIO', 'SERVIR', 'SIETE', 'SIGLO', 'SIGNO', 'SILBA', 'SILBAR', 'SIMBO', 'SIMPLE', 'SITIO', 'SOBRAR', 'SOBRE', 'SOCIO', 'SOL', 'SOLAR', 'SONIDO', 'SONAR', 'SONRISA', 'SOPA', 'SORDO', 'SORPRESA', 'SUAVE', 'SUBIR', 'SUECO', 'SUELO', 'SUEÑO', 'SUERTE', 'SUFIR', 'SUMAR', 'SUPER', 'SUR', 'TABLA', 'TACTO', 'TALCO', 'TALLA', 'TALLO', 'TAMBIEN', 'TANQUE', 'TARDE', 'TAREA', 'TAXI', 'TEATRO', 'TECHO', 'TEJIDO', 'TELA', 'TEMA', 'TEMOR', 'TENER', 'TENIS', 'TEORIA', 'TERCO', 'TERMO', 'TESORO', 'TESTIGO', 'TIEMPO', 'TIENDA', 'TIERRA', 'TIGRE', 'TIMIDO', 'TINTA', 'TIPO', 'TIRAR', 'TITULO', 'TOCAR', 'TODOS', 'TOMAR', 'TONO', 'TORO', 'TORRE', 'TORTA', 'TOS', 'TRABAJO', 'TRAER', 'TRAMO', 'TRATO', 'TRECE', 'TREN', 'TRES', 'TRIBU', 'TRIGO', 'TRISTE', 'TRONO', 'TROPA', 'TROZO', 'TUERTO', 'TUMBA', 'TUNEL', 'TURNO', 'UBICAR', 'ULTIMO', 'UNO', 'USAR', 'VACA', 'VACIO', 'VALLE', 'VALOR', 'VAPOR', 'VARON', 'VASO', 'VECINO', 'VEINTE', 'VELA', 'VELAR', 'VELERO', 'VELLO', 'VENADO', 'VENDER', 'VENENO', 'VENIR', 'VENTA', 'VER', 'VERANO', 'VERBO', 'VERDE', 'VERDAD', 'VEREDA', 'VERSO', 'VERTER', 'VESTIR', 'VIAJE', 'VIDA', 'VIDEO', 'VIEJO', 'VILLA', 'VINO', 'VIRGEN', 'VISTA', 'VIVIR', 'VOCAL', 'VOLAR', 'VOLCAN', 'VOLUMEN', 'VOLVER', 'VOTAR', 'VOTO', 'YACER', 'YEMA', 'YERNO', 'YODO', 'YUNTA', 'ZONA', 'ZORRO'],
  default: ['ABOUT', 'ABOVE', 'ACTOR', 'ACUTE', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DERBY', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DREAM', 'DRESS', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PHASE', 'PHONE', 'PHOTO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RIGHT', 'RIVAL', 'RIVER', 'ROBIN', 'ROBOT', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED', 'TRUCK', 'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH']
};

function getRandomWord(lang: string): string {
  const list = WORD_LISTS[lang] || WORD_LISTS['default'];
  return list[Math.floor(Math.random() * list.length)];
}

interface BoardState {
  guesses: string[];
  currentGuess: string;
  target: string;
  solved: boolean;
}

export default function MultiWordleGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [boardCount, setBoardCount] = useState(2); // 2 = Dordle, 4 = Quordle
  const [boards, setBoards] = useState<BoardState[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showResults, setShowResults] = useState(false);

  const initGame = useCallback((count: number) => {
    const newBoards: BoardState[] = [];
    for (let i = 0; i < count; i++) {
      newBoards.push({
        guesses: [],
        currentGuess: '',
        target: getRandomWord(lang),
        solved: false,
      });
    }
    setBoards(newBoards);
    setGameOver(false);
    setWon(false);
    setShowResults(false);
    setMessage('');
  }, [lang]);

  useEffect(() => {
    initGame(2);
  }, [initGame]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver) return;

    setBoards(prev => {
      const newBoards = [...prev];
      let changed = false;

      for (const board of newBoards) {
        if (board.solved) continue;

        if (key === 'BACKSPACE') {
          if (board.currentGuess.length > 0) {
            board.currentGuess = board.currentGuess.slice(0, -1);
            changed = true;
          }
        } else if (key === 'ENTER') {
          if (board.currentGuess.length === 5) {
            board.guesses.push(board.currentGuess);
            
            if (board.currentGuess === board.target) {
              board.solved = true;
            }
            board.currentGuess = '';
            changed = true;
          }
        } else if (board.currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
          board.currentGuess += key;
          changed = true;
        }
      }

      return changed ? newBoards : prev;
    });
  }, [gameOver]);

  // Check game over
  useEffect(() => {
    if (boards.length === 0) return;

    const allSolved = boards.every(b => b.solved);
    const allLost = boards.every(b => !b.solved && b.guesses.length >= 6);

    if (allSolved || allLost) {
      setGameOver(true);
      setWon(allSolved);
      setShowResults(true);
      
      const solvedCount = boards.filter(b => b.solved).length;
      const totalGuesses = boards.reduce((sum, b) => sum + b.guesses.length, 0);
      
      trackGameComplete('multi-wordle', { 
        boards: boardCount, 
        solved: solvedCount,
        totalGuesses 
      });

      if (allSolved) {
        showMessage('All boards solved!', 'success');
      } else {
        showMessage('Game Over', 'error');
      }
    }
  }, [boards, boardCount, trackGameComplete]);

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2000);
  };

  const getLetterStatus = (letter: string, index: number, target: string): 'correct' | 'present' | 'absent' | '' => {
    if (!letter) return '';
    if (target[index] === letter) return 'correct';
    if (target.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyboardStatus = (letter: string): 'correct' | 'present' | 'absent' | '' => {
    let status: 'correct' | 'present' | 'absent' | '' = '';
    
    for (const board of boards) {
      for (const guess of board.guesses) {
        for (let i = 0; i < guess.length; i++) {
          if (guess[i] === letter) {
            const letterStatus = getLetterStatus(letter, i, board.target);
            if (letterStatus === 'correct') return 'correct';
            if (letterStatus === 'present' && status !== 'correct') status = 'present';
            if (letterStatus === 'absent' && !status) status = 'absent';
          }
        }
      }
    }
    
    return status;
  };

  const switchMode = (count: number) => {
    setBoardCount(count);
    initGame(count);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-violet-500" />
          <span className="font-bold text-lg">Multi-Wordle</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => switchMode(2)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              boardCount === 2 
                ? 'bg-violet-500 text-white' 
                : 'bg-sand-100 text-sand-500 hover:bg-sand-200'
            }`}
          >
            Dordle (2)
          </button>
          <button
            onClick={() => switchMode(4)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              boardCount === 4 
                ? 'bg-violet-500 text-white' 
                : 'bg-sand-100 text-sand-500 hover:bg-sand-200'
            }`}
          >
            Quordle (4)
          </button>
        </div>
      </div>

      {/* Boards Grid */}
      <div className={`grid gap-4 mb-6 ${boardCount === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
        {boards.map((board, boardIdx) => (
          <div 
            key={boardIdx}
            className={`bg-white border rounded-xl p-3 ${
              board.solved ? 'border-green-300 bg-green-50' : 'border-sand-200'
            }`}
          >
            <div className="text-xs text-sand-400 mb-2 text-center">
              Board {boardIdx + 1} {board.solved && '✓'}
            </div>
            
            {/* Grid */}
            <div className="grid grid-rows-6 gap-1 mb-2">
              {[...Array(6)].map((_, row) => {
                const guess = board.guesses[row];
                const isCurrentRow = row === board.guesses.length;
                const displayWord = guess || (isCurrentRow ? board.currentGuess : '');
                
                return (
                  <div key={row} className="grid grid-cols-5 gap-1">
                    {[...Array(5)].map((_, col) => {
                      const letter = displayWord[col] || '';
                      const status = guess 
                        ? getLetterStatus(letter, col, board.target)
                        : '';
                      
                      return (
                        <div
                          key={col}
                          className={`aspect-square flex items-center justify-center rounded font-bold text-lg transition ${
                            status === 'correct'
                              ? 'bg-green-500 text-white'
                              : status === 'present'
                              ? 'bg-amber-400 text-white'
                              : status === 'absent'
                              ? 'bg-sand-300 text-white'
                              : letter
                              ? 'bg-sand-100 text-coal border border-sand-200'
                              : 'bg-sand-50 border border-sand-100'
                          }`}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center py-2 rounded-lg mb-4 ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual Keyboard */}
      {!gameOver && (
        <div className="space-y-1.5">
          {[
            'QWERTYUIOP',
            'ASDFGHJKL',
            'ZXCVBNM'
          ].map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1">
              {rowIdx === 2 && (
                <button
                  onClick={() => handleKeyPress('ENTER')}
                  className="px-3 py-3 bg-sand-200 text-sand-600 rounded-lg text-xs font-bold hover:bg-sand-300 transition"
                >
                  ENTER
                </button>
              )}
              {row.split('').map(letter => {
                const status = getKeyboardStatus(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => handleKeyPress(letter)}
                    className={`w-8 h-10 rounded-lg font-bold text-sm transition ${
                      status === 'correct'
                        ? 'bg-green-500 text-white'
                        : status === 'present'
                        ? 'bg-amber-400 text-white'
                        : status === 'absent'
                        ? 'bg-sand-300 text-white'
                        : 'bg-sand-200 text-coal hover:bg-sand-300'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
              {rowIdx === 2 && (
                <button
                  onClick={() => handleKeyPress('BACKSPACE')}
                  className="px-3 py-3 bg-sand-200 text-sand-600 rounded-lg text-xs font-bold hover:bg-sand-300 transition"
                >
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl p-6 mt-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">
                {won ? 'All Boards Solved!' : 'Game Over'}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {boards.map((board, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl font-bold text-violet-600">
                    {board.solved ? board.guesses.length : 'X'}
                  </p>
                  <p className="text-sm text-sand-500">Board {idx + 1}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => initGame(boardCount)}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Physical keyboard support */}
      <KeyboardListener onKeyPress={handleKeyPress} />
    </div>
  );
}

function KeyboardListener({ onKeyPress }: { onKeyPress: (key: string) => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        onKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        onKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  return null;
}
