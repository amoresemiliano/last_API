/**
 * Calcula la cantidad de empleados presentes según día y hora.
 * Basado en los horarios reales de la plantilla de El Criollo.
 */
export const getStaffCount = (day, hour) => {
  let count = 0;
  // Convertimos a mayúsculas para asegurar coincidencia con los CSV
  const d = day.toUpperCase(); 
  const isWeekDay = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE'].includes(d);
  const isSat = d === 'SAB';

  // Maria & José: Lu a Vi de 10 a 18hs (2 personas)
  if (isWeekDay && hour >= 10 && hour < 18) count += 2;
  
  // Luis: Lu a Sa de 13 a 17hs y de 20 a 23hs (1 persona)
  if ((isWeekDay || isSat) && ((hour >= 13 && hour < 17) || (hour >= 20 && hour < 23))) count += 1;
  
  // Eduardo: Lu a Sa de 17 a 20hs y Sa de 12 a 16hs (1 persona)
  if ((isWeekDay || isSat) && (hour >= 17 && hour < 20)) count += 1;
  if (isSat && hour >= 12 && hour < 16) count += 1;

  // Fernando: Lu a Sa de 18 a 24hs (1 persona)
  if ((isWeekDay || isSat) && (hour >= 18 && hour < 24)) count += 1;

  // Diego: Vi de 20 a 23hs y Sa de 13 a 16hs (1 persona)
  if (d === 'VIE' && hour >= 20 && hour < 23) count += 1;
  if (isSat && hour >= 13 && hour < 16) count += 1;

  // Elizabeth: Lu a Sa de 20 a 24hs (1 persona)
  if ((isWeekDay || isSat) && (hour >= 20 && hour < 24)) count += 1;

  // Si no hay nadie por horario, devolvemos 1 para no romper cálculos de productividad
  return count > 0 ? count : 1;
};

/**
 * Calcula el costo monetario del personal en un bloque horario.
 */
export const getStaffCost = (day, hour, hourlyRate = 12) => {
  const staffCount = getStaffCount(day, hour);
  return staffCount * hourlyRate;
};
