export const STORAGE_KEY = "life-system:v1"
export const PRIVATE_STORAGE_KEY = "dayforge:room:v1"
export const URL_PREFIX = "ls1."
export const URL_LIMIT = 6000

const DAILY_MINIMUM = 3
const CHECKS_PER_DEBT = 2
const POINTS_PER_CHECK = 5
const LEVELS = [
  { name: "Starter", points: 0 },
  { name: "Builder", points: 50 },
  { name: "Consistent", points: 150 },
  { name: "Disciplined", points: 350 },
  { name: "Unstoppable", points: 700 },
]

const INITIAL_AREAS = [
  ["career", "Career", "Growth, relationships, useful skills, and meaningful work."],
  ["family", "Family", "Care for family, meet their needs, and spend quality time together."],
  ["health", "Health", "Maintain physical energy and long-term health."],
  ["happiness", "Happiness", "Make room for personal fulfilment, joy, and rest."],
  ["money", "Money", "Build financial stability and grow wealth intentionally."],
]

const INITIAL_LOOPS = [
  
]

export function uid(prefix) {
  return `${prefix}-${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`
}

function parseDate(date) {
  const [year, month, day] = date.split("-").map(Number)
  return new Date(year, month - 1, day, 12)
}

export function formatDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function shiftDate(date, days) {
  const shifted = parseDate(date)
  shifted.setDate(shifted.getDate() + days)
  return formatDate(shifted)
}

function datesBetween(start, end) {
  const dates = []
  for (let date = start; date <= end; date = shiftDate(date, 1)) dates.push(date)
  return dates
}

export function yearDates(year = formatDate().slice(0, 4)) {
  return datesBetween(`${year}-01-01`, `${year}-12-31`)
}

export function calculateScore({ startedAt, today, days }) {
  let debt = 0
  let streak = 0
  let bestStreak = 0
  let consecutiveMisses = 0
  let points = 0

  for (const date of datesBetween(startedAt, today)) {
    const checks = Math.max(0, Number(days[date]) || 0)
    points += checks * POINTS_PER_CHECK
    if (checks >= DAILY_MINIMUM) {
      consecutiveMisses = 0
      debt = Math.max(0, debt - Math.floor((checks - DAILY_MINIMUM) / CHECKS_PER_DEBT))
      if (debt === 0) {
        streak += 1
        bestStreak = Math.max(bestStreak, streak)
      }
    } else if (date !== today) {
      debt += 1
      consecutiveMisses += 1
      if (consecutiveMisses >= 2) streak = 0
    }
  }

  const levelIndex = LEVELS.findLastIndex((level) => points >= level.points)
  return {
    points,
    streak,
    bestStreak,
    debt,
    status: debt > 0 ? "OFF PATH" : "IN GAME",
    level: levelIndex + 1,
    levelName: LEVELS[levelIndex].name,
    nextLevelAt: LEVELS[levelIndex + 1]?.points ?? null,
    dailyMinimum: DAILY_MINIMUM,
    checksPerDebt: CHECKS_PER_DEBT,
    pointsPerCheck: POINTS_PER_CHECK,
  }
}

export function createStore(today = formatDate()) {
  return {
    version: 1,
    startedAt: today,
    areas: INITIAL_AREAS.map(([id, title, vision]) => ({ id, title, vision, notes: "" })),
    loops: INITIAL_LOOPS.map(([title, areaId]) => ({
      id: uid("loop"),
      title,
      areaId,
      time: "",
      createdAt: today,
      archived: false,
      torture: false,
    })),
    tasks: [],
    days: {},
    timerSettings: { focusMinutes: 25, breakMinutes: 5, alert: "sound" },
    activeTimer: null,
    sessions: [],
    companion: { name: "", bond: 3, lastSeenAt: "", lastLine: "" },
    notes: [],
    loopSkips: { date: "", ids: [] },
    focusDay: null,
    weekFocus: null,
  }
}

/** Monday of the local week, as YYYY-MM-DD. */
export function weekOf(date = new Date()) {
  const local = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = local.getDay()
  local.setDate(local.getDate() + (day === 0 ? -6 : 1 - day))
  return formatDate(local)
}

export function currentWeekFocus(store, date = new Date()) {
  const focus = store.weekFocus
  if (!focus || focus.week !== weekOf(date) || !focus.title) return null
  return focus
}

export function weekFocusCount(store, date = new Date()) {
  const start = weekOf(date)
  const end = shiftDate(start, 7)
  return (store.sessions || []).filter(
    (session) => session.kind === "focus" && session.date >= start && session.date < end,
  ).length
}

export function setWeekFocus(store, title, date = new Date()) {
  const clean = text(title, 80).trim()
  if (!clean) {
    store.weekFocus = null
    return
  }
  const week = weekOf(date)
  store.weekFocus = {
    week,
    title: clean,
    note: store.weekFocus?.week === week ? store.weekFocus.note || "" : "",
  }
}

export function closeWeekFocus(store, note, date = new Date()) {
  const focus = currentWeekFocus(store, date)
  if (!focus) return
  store.weekFocus = { ...focus, note: text(note, 280).trim() }
}

export function createPrivateStore() {
  return {
    version: 1,
    shadows: [],
    games: {
      stroop: { best: 0, plays: 0 },
      simon: { best: 0, plays: 0 },
    },
  }
}

/**
 * Private room data deliberately has its own localStorage record. Ordinary
 * JSON and compact URL exports only see the public store.
 */
export function normalizePrivateStore(input) {
  const clean = createPrivateStore()
  if (!input || input.version !== 1) return clean
  clean.shadows = Array.isArray(input.shadows)
    ? input.shadows.slice(0, 100).map((shadow) => ({
        id: text(shadow.id, 100),
        name: text(shadow.name, 160, "Untitled shadow"),
        createdAt: text(shadow.createdAt, 10),
        marks: Object.fromEntries(
          Object.entries(shadow.marks || {})
            .filter(([date]) => /^\d{4}-\d{2}-\d{2}$/.test(date))
            .slice(-800)
            .map(([date, note]) => [date, text(note, 500)]),
        ),
      }))
    : []
  for (const name of Object.keys(clean.games)) {
    clean.games[name] = {
      best: Math.max(0, Math.round(Number(input.games?.[name]?.best) || 0)),
      plays: Math.max(0, Math.round(Number(input.games?.[name]?.plays) || 0)),
    }
  }
  return clean
}

export const COMPANION_MAX_BOND = 5

const COMPANION_LINES = {
  hungry: [
    "Nothing yet today. Start small?",
    "I am waiting on your first check.",
    "One check and I stop staring.",
  ],
  sleepy: [
    "You vanished. I kept the lights on.",
    "Quiet days. I am still here.",
    "Wake the map up.",
  ],
  happy: ["Good. Keep the day moving.", "That counts. Do one more.", "You showed up today."],
  proud: ["Every loop closed. I saw it.", "Perfect run today.", "You cleared the set."],
  focused: ["I will sit here quietly.", "Deep work. I am watching the clock.", "Go. I will wait."],
  waiting: ["Paused. I am holding your place.", "Take the breath, then back.", "Still holding it."],
}

/** Consecutive days with nothing on them, ending the day before `today`. */
function skippedBefore(store, today) {
  let skipped = 0
  for (let date = shiftDate(today, -1); date >= store.startedAt; date = shiftDate(date, -1)) {
    if (store.days[date]?.events.length) break
    skipped += 1
  }
  return skipped
}

/** The mood comes from your day, never from a schedule. */
export function companionMood(store, today = formatDate()) {
  if (store.activeTimer) return store.activeTimer.endsAt ? "focused" : "waiting"
  if (isFullLoopDay(store, today)) return "proud"
  if (store.days[today]?.events.length) return "happy"
  return skippedBefore(store, today) >= 2 ? "sleepy" : "hungry"
}

/** Never the same line twice in a row, which is most of feeling alive. */
export function companionLine(store, mood, seed = 0) {
  const lines = COMPANION_LINES[mood] || COMPANION_LINES.happy
  const fresh = lines.filter((line) => line !== store.companion.lastLine)
  const pool = fresh.length ? fresh : lines
  return pool[Math.abs(Math.trunc(seed)) % pool.length]
}

/**
 * Your life is their food: a day you acted feeds them, skipped days shrink
 * them. Runs once per calendar day, on the first open.
 */
export function companionVisit(store, today = formatDate()) {
  const companion = store.companion
  if (companion.lastSeenAt === today) return
  /* Losses are capped so a long absence shrinks them instead of erasing them,
     and a day at a time brings them back. */
  const change = Math.max(-2, 1 - skippedBefore(store, today))
  companion.bond = Math.max(0, Math.min(COMPANION_MAX_BOND, companion.bond + change))
  companion.lastSeenAt = today
}

function day(store, date) {
  return (store.days[date] ||= { journal: "", events: [] })
}

function toggleEvent(store, date, type, refId, title, notes = "") {
  const current = day(store, date)
  const index = current.events.findIndex((event) => event.type === type && event.refId === refId)
  if (index >= 0) {
    current.events.splice(index, 1)
    return false
  }
  current.events.push({
    id: uid("event"),
    type,
    refId,
    title,
    notes: text(notes, 2000),
    at: new Date().toISOString(),
  })
  return true
}

export function toggleLoop(store, loopId, date = formatDate()) {
  const loop = store.loops.find((candidate) => candidate.id === loopId && !candidate.archived)
  if (!loop) throw new Error("Loop not found")
  return toggleEvent(store, date, "loop", loop.id, loop.title)
}

/** Ignore today's reminder. The loop stays open; it just stops sitting in the shade. */
export function skipLoop(store, loopId, date = formatDate()) {
  const loop = store.loops.find((candidate) => candidate.id === loopId && !candidate.archived)
  if (!loop) return false
  const ids = store.loopSkips?.date === date ? store.loopSkips.ids.filter((id) => id !== loop.id) : []
  ids.push(loop.id)
  store.loopSkips = { date, ids: ids.slice(0, 40) }
  return true
}

export function loopSkipped(store, loopId, date = formatDate()) {
  return Boolean(store.loopSkips?.date === date && store.loopSkips.ids?.includes(loopId))
}

export function toggleTask(store, taskId, date = formatDate()) {
  const task = store.tasks.find((candidate) => candidate.id === taskId)
  if (!task) throw new Error("Task not found")
  if (task.doneAt && task.doneAt !== date) {
    const events = store.days[task.doneAt]?.events
    const index =
      events?.findIndex((event) => event.type === "task" && event.refId === task.id) ?? -1
    if (index >= 0) events.splice(index, 1)
    task.doneAt = null
    return false
  }
  /* The note is copied onto the event, so editing or deleting the task later
     cannot rewrite what the day log already recorded. */
  const done = toggleEvent(store, date, "task", task.id, task.title, task.notes)
  task.doneAt = done ? date : null
  return done
}

export function setJournal(store, date, journal) {
  day(store, date).journal = journal
}

export function startTimer(store, kind, note, minutes, now = new Date()) {
  if (store.activeTimer) throw new Error("A timer is already running")
  const duration = Math.max(1, Math.min(180, Math.round(Number(minutes) || 0)))
  store.activeTimer = {
    id: uid("timer"),
    kind: kind === "break" ? "break" : "focus",
    note: text(note, 500),
    startedAt: now.toISOString(),
    endsAt: new Date(now.getTime() + duration * 60_000).toISOString(),
    remainingMs: null,
    plannedMinutes: duration,
    pauses: 0,
    pausedMs: 0,
    pausedAt: null,
  }
  if (store.focusDay) store.focusDay.nagging = false
}

export function isFocusDay(store, date = formatDate()) {
  return store.focusDay?.date === date
}

export function focusBreakMinutes(store) {
  if (store.focusDay?.hard) return 2
  return Math.max(1, Math.min(180, Math.round(Number(store.timerSettings?.breakMinutes) || 5)))
}

export function startFocusDay(store, date = formatDate(), hard = false) {
  store.focusDay = { date, hard: Boolean(hard), nagging: false, goalMinutes: 180, quiet: [] }
}

export function focusGoalMinutes(store) {
  const goal = Number(store.focusDay?.goalMinutes)
  if (!Number.isFinite(goal)) return 180
  return Math.max(30, Math.min(480, Math.round(goal / 30) * 30))
}

export function setFocusGoal(store, minutes) {
  if (!store.focusDay) return
  store.focusDay.goalMinutes = focusGoalMinutes({ focusDay: { goalMinutes: minutes } })
}

export function focusDoneMinutes(store, date = formatDate()) {
  return (store.sessions || [])
    .filter((session) => session.kind === "focus" && session.date === date)
    .reduce((total, session) => total + (Number(session.actualMinutes) || 0), 0)
}

export function focusGoalMet(store, date = formatDate()) {
  return isFocusDay(store, date) && focusDoneMinutes(store, date) >= focusGoalMinutes(store)
}

/** Same-day window. End is exclusive, so 14:00–16:00 is quiet until 16:00. */
export function addFocusQuiet(store, start, end) {
  if (!store.focusDay) return false
  const from = canonicalClock(start)
  const to = canonicalClock(end)
  if (!from || !to || clockMinutes(to) <= clockMinutes(from)) return false
  const quiet = store.focusDay.quiet || []
  if (quiet.length >= 6) return false
  if (quiet.some((range) => range.start === from && range.end === to)) return false
  store.focusDay.quiet = [...quiet, { start: from, end: to }]
  return true
}

export function removeFocusQuiet(store, index) {
  if (!store.focusDay?.quiet) return
  store.focusDay.quiet = store.focusDay.quiet.filter((_, item) => item !== index)
}

export function setFocusLearned(store, note) {
  if (!store.focusDay) return
  store.focusDay.learned = text(note, 280).trim()
}

/** One unfinished loop. The uncomfortable one wins, otherwise the first still open. */
export function openLoop(store, date = formatDate()) {
  const loops = (store.loops || []).filter(
    (loop) =>
      loop &&
      !loop.archived &&
      loop.title &&
      !loopDone(store, loop.id, date),
  )
  return loops.find((loop) => /uncomfortable/i.test(loop.title)) || loops[0] || null
}

function loopDone(store, id, date) {
  if (!store.days?.[date]) return false
  return isDone(store, "loop", id, date) || loopSkipped(store, id, date)
}

export function endFocusDay(store) {
  store.focusDay = null
}

export function setFocusHard(store, hard) {
  if (store.focusDay) store.focusDay.hard = Boolean(hard)
}

/**
 * The countdown hit zero. On a focus day, a finished focus starts the break,
 * and a finished break rings until the next focus. A normal day just records it.
 */
export function advanceFocusDay(store, now = new Date()) {
  const timer = store.activeTimer
  if (!timer?.endsAt) return "idle"
  const end = new Date(timer.endsAt).getTime()
  if (Number.isNaN(end) || end > now.getTime()) return "running"
  const kind = timer.kind
  const on = isFocusDay(store, formatDate(now))
  finishTimer(store, timer.endsAt)
  if (!on) return "done"
  if (focusGoalMet(store, formatDate(now))) {
    store.focusDay.nagging = false
    return "met"
  }
  if (kind === "focus") return beginFocusBreak(store, end, now)
  store.focusDay.nagging = true
  return "nag"
}

/** Finish the block early. A focus day still takes the break, then rings. */
export function finishFocusBlock(store, now = new Date()) {
  const timer = store.activeTimer
  if (!timer) return "idle"
  const kind = timer.kind
  const on = isFocusDay(store, formatDate(now))
  const scheduled = timer.endsAt ? new Date(timer.endsAt).getTime() : NaN
  const endedAt =
    Number.isFinite(scheduled) && now.getTime() >= scheduled ? new Date(scheduled).toISOString() : now.toISOString()
  finishTimer(store, endedAt)
  if (!on) return "done"
  if (focusGoalMet(store, formatDate(now))) {
    store.focusDay.nagging = false
    return "met"
  }
  if (kind === "focus") return beginFocusBreak(store, new Date(endedAt).getTime(), now)
  store.focusDay.nagging = true
  return "nag"
}

function beginFocusBreak(store, focusEndedAt, now) {
  const breakMs = focusBreakMinutes(store) * 60_000
  const breakEnd = focusEndedAt + breakMs
  if (now.getTime() >= breakEnd) {
    store.focusDay.nagging = true
    return "nag"
  }
  startTimer(store, "break", "", focusBreakMinutes(store), new Date(focusEndedAt))
  store.activeTimer.endsAt = new Date(breakEnd).toISOString()
  return "break"
}

/**
 * Pausing stores the time left instead of a deadline, so a paused timer keeps
 * its remaining time across a reload and resumes exactly where it stopped.
 */
export function pauseTimer(store, now = Date.now()) {
  const timer = store.activeTimer
  if (!timer || !timer.endsAt) return
  timer.remainingMs = Math.max(0, new Date(timer.endsAt).getTime() - now)
  timer.endsAt = null
  timer.pauses = (timer.pauses || 0) + 1
  timer.pausedAt = new Date(now).toISOString()
}

export function resumeTimer(store, now = Date.now()) {
  const timer = store.activeTimer
  if (!timer || timer.endsAt) return
  timer.pausedMs = pausedMsFor(timer, now)
  timer.pausedAt = null
  timer.endsAt = new Date(now + (timer.remainingMs ?? 0)).toISOString()
  timer.remainingMs = null
}

/** Idle time so far, including a pause that is still open. */
export function pausedMsFor(timer, now = Date.now()) {
  const extra = timer.pausedAt ? Math.max(0, now - new Date(timer.pausedAt).getTime()) : 0
  return Math.max(0, (timer.pausedMs || 0) + extra)
}

/**
 * Each pause costs at least a minute, and full idle minutes stack on top.
 * Breaks are rest, so they are not taxed.
 */
export function pausePenalty(timer, now = Date.now()) {
  if (!timer || timer.kind === "break") return 0
  const pauses = timer.pauses || 0
  if (!pauses && !timer.pausedAt) return 0
  return Math.max(pauses, Math.ceil(pausedMsFor(timer, now) / 60_000))
}

function remainingMsFor(timer, now) {
  if (timer.endsAt) return Math.max(0, new Date(timer.endsAt).getTime() - now)
  return Math.max(0, timer.remainingMs ?? 0)
}

export function finishTimer(store, endedAt = new Date().toISOString()) {
  const timer = store.activeTimer
  if (!timer) return null
  const end = new Date(endedAt)
  const workedMs = timer.plannedMinutes * 60_000 - remainingMsFor(timer, end.getTime())
  const focused = Math.min(timer.plannedMinutes, Math.max(0, Math.ceil(workedMs / 60_000)))
  const penalty = pausePenalty(timer, end.getTime())
  const session = {
    id: timer.id,
    kind: timer.kind,
    note: timer.note,
    date: formatDate(end),
    startedAt: timer.startedAt,
    endedAt: end.toISOString(),
    plannedMinutes: timer.plannedMinutes,
    actualMinutes: Math.max(0, focused - penalty),
    pauses: timer.pauses || 0,
    pauseMinutes: Math.ceil(pausedMsFor(timer, end.getTime()) / 60_000),
  }
  store.sessions.push(session)
  store.activeTimer = null
  return session
}

export function cancelTimer(store) {
  store.activeTimer = null
}

/**
 * Everything that happened on one day, in the order it happened: loop checks,
 * completed tasks with the note captured at completion, focus and break
 * sessions, and the journal entry.
 */
export function dayLog(store, date) {
  const record = store.days[date] || { journal: "", events: [] }
  const sessions = store.sessions.filter((session) => session.date === date)
  const minutesFor = (kind) =>
    sessions
      .filter((session) => session.kind === kind)
      .reduce((total, session) => total + session.actualMinutes, 0)

  return {
    journal: record.journal,
    summary: {
      loops: record.events.filter((event) => event.type === "loop").length,
      tasks: record.events.filter((event) => event.type === "task").length,
      focusSessions: sessions.filter((session) => session.kind === "focus").length,
      focusMinutes: minutesFor("focus"),
      breakMinutes: minutesFor("break"),
    },
    entries: [
      ...record.events.map((event) => ({
        id: event.id,
        kind: event.type,
        at: event.at,
        title: event.title,
        notes: event.notes || "",
      })),
      ...sessions.map((session) => ({
        id: session.id,
        kind: session.kind,
        at: session.startedAt,
        title: session.kind === "focus" ? "Focus session" : "Break",
        notes: session.note,
        minutes: session.actualMinutes,
        pauses: session.pauses || 0,
        pauseMinutes: session.pauseMinutes || 0,
      })),
    ].sort((a, b) => String(a.at).localeCompare(String(b.at))),
  }
}

/**
 * Deleting only removes the thing you stop doing. Past completions stay in
 * `days`, so history, streaks, and points never rewrite themselves.
 */
export function deleteLoop(store, loopId) {
  store.loops = store.loops.filter((loop) => loop.id !== loopId)
}

export function deleteTask(store, taskId) {
  store.tasks = store.tasks.filter((task) => task.id !== taskId)
}

/** Unfinished tasks that have reached their due date, oldest deadline first. */
export function dueTasks(store, today = formatDate()) {
  return store.tasks
    .filter((task) => !task.doneAt && task.dueDate && task.dueDate <= today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}

export function isDone(store, type, refId, date = formatDate()) {
  return Boolean(
    store.days[date]?.events.some((event) => event.type === type && event.refId === refId),
  )
}

export function scoreForStore(store, today = formatDate()) {
  return calculateScore({
    startedAt: store.startedAt,
    today,
    days: Object.fromEntries(
      Object.entries(store.days).map(([date, value]) => [date, value.events.length]),
    ),
  })
}

/**
 * True when every loop that existed on `date` was checked that day.
 * ponytail: deleted loops cannot be reconstructed, so deleting a loop you kept
 * missing can turn an old day green. Storing a per-day loop roster would fix it.
 */
export function isFullLoopDay(store, date) {
  const expected = store.loops.filter((loop) => !loop.archived && loop.createdAt <= date)
  return expected.length > 0 && expected.every((loop) => isDone(store, "loop", loop.id, date))
}

export function loopProgress(store, loopId, today = formatDate()) {
  let weekDone = 0
  let streak = 0
  for (let offset = 0; offset > -7; offset -= 1) {
    if (isDone(store, "loop", loopId, shiftDate(today, offset))) weekDone += 1
  }
  for (let date = today; date >= store.startedAt; date = shiftDate(date, -1)) {
    if (!isDone(store, "loop", loopId, date)) break
    streak += 1
  }
  return { weekDone, streak, percent: Math.round((weekDone / 7) * 100) }
}

function text(value, limit = 10000, fallback = "") {
  return (typeof value === "string" ? value : fallback).slice(0, limit)
}

export function normalizeStore(input) {
  if (!input || input.version !== 1 || !Array.isArray(input.areas) || !Array.isArray(input.loops)) {
    throw new Error("This is not a Dayforge v1 backup")
  }
  const store = {
    version: 1,
    startedAt: /^\d{4}-\d{2}-\d{2}$/.test(input.startedAt) ? input.startedAt : formatDate(),
    areas: input.areas.slice(0, 100).map((area) => ({
      id: text(area.id, 100),
      title: text(area.title, 160, "Untitled area"),
      vision: text(area.vision),
      notes: text(area.notes),
    })),
    loops: input.loops.slice(0, 500).map((loop) => ({
      id: text(loop.id, 100),
      title: text(loop.title, 160, "Untitled loop"),
      areaId: text(loop.areaId, 100),
      time: text(loop.time, 5),
      createdAt: text(loop.createdAt, 10),
      archived: Boolean(loop.archived),
      torture: Boolean(loop.torture),
    })),
    tasks: Array.isArray(input.tasks)
      ? input.tasks.slice(0, 2000).map((task) => ({
          id: text(task.id, 100),
          title: text(task.title, 160, "Untitled task"),
          areaId: text(task.areaId, 100),
          dueDate: text(task.dueDate, 10) || null,
          createdAt: text(task.createdAt, 10),
          doneAt: text(task.doneAt, 10) || null,
          notes: text(task.notes),
          torture: Boolean(task.torture),
        }))
      : [],
    days: {},
    timerSettings: {
      focusMinutes: boundedMinutes(input.timerSettings?.focusMinutes, 25),
      breakMinutes: boundedMinutes(input.timerSettings?.breakMinutes, 5),
      alert: input.timerSettings?.alert === "vibrate" ? "vibrate" : "sound",
    },
    activeTimer: normalizeTimer(input.activeTimer),
    sessions: Array.isArray(input.sessions)
      ? input.sessions.slice(-5000).map(normalizeSession).filter(Boolean)
      : [],
    companion: normalizeCompanion(input.companion),
    loopSkips: normalizeSkips(input.loopSkips),
    focusDay: normalizeFocusDay(input.focusDay),
    weekFocus: normalizeWeekFocus(input.weekFocus),
    notes: Array.isArray(input.notes)
      ? input.notes.slice(0, 1000).map((note) => ({
          id: text(note.id, 100),
          title: text(note.title, 160, "Untitled note"),
          content: text(note.content, 100000),
          createdAt: text(note.createdAt, 30),
          updatedAt: text(note.updatedAt, 30),
        }))
      : [],
  }
  for (const [date, value] of Object.entries(input.days || {}).slice(-800)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue
    store.days[date] = {
      journal: text(value.journal),
      events: Array.isArray(value.events)
        ? value.events.slice(0, 1000).map((event) => ({
            id: text(event.id, 100),
            type: event.type === "task" ? "task" : "loop",
            refId: text(event.refId, 100),
            title: text(event.title, 160, "Completed item"),
            notes: text(event.notes, 2000),
            at: text(event.at, 30),
          }))
        : [],
    }
  }
  return store
}

function normalizeWeekFocus(value) {
  const week = text(value?.week, 10)
  const title = text(value?.title, 80).trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(week) || !title) return null
  return { week, title, note: text(value?.note, 280).trim() }
}

function clockMinutes(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(value || ""))
  if (!match) return null
  const hour = Number(match[1])
  const minute = Number(match[2])
  if (hour > 23 || minute > 59) return null
  return hour * 60 + minute
}

function canonicalClock(value) {
  const minutes = clockMinutes(value)
  if (minutes == null) return ""
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`
}

function normalizeFocusDay(value) {
  const date = text(value?.date, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  const quiet = Array.isArray(value.quiet)
    ? value.quiet
        .slice(0, 6)
        .map((range) => {
          const start = canonicalClock(range?.start)
          const end = canonicalClock(range?.end)
          if (!start || !end || clockMinutes(end) <= clockMinutes(start)) return null
          return { start, end }
        })
        .filter(Boolean)
    : []
  return {
    date,
    hard: Boolean(value.hard),
    nagging: Boolean(value.nagging),
    goalMinutes: focusGoalMinutes({ focusDay: value }),
    quiet,
    learned: text(value.learned, 280).trim(),
  }
}

function normalizeSkips(skips) {
  const date = text(skips?.date, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { date: "", ids: [] }
  const ids = Array.isArray(skips.ids)
    ? skips.ids
        .slice(0, 40)
        .map((id) => text(id, 100))
        .filter(Boolean)
    : []
  return { date, ids }
}

function normalizeCompanion(companion) {
  const bond = Math.round(Number(companion?.bond))
  return {
    name: text(companion?.name, 24),
    bond: Number.isFinite(bond) ? Math.max(0, Math.min(COMPANION_MAX_BOND, bond)) : 3,
    lastSeenAt: text(companion?.lastSeenAt, 10),
    lastLine: text(companion?.lastLine, 200),
  }
}

function boundedMinutes(value, fallback) {
  const minutes = Math.round(Number(value))
  return Number.isFinite(minutes) ? Math.max(1, Math.min(180, minutes)) : fallback
}

function boundedCount(value, fallback = 0) {
  const count = Math.round(Number(value))
  return Number.isFinite(count) ? Math.max(0, Math.min(180, count)) : fallback
}

function normalizeTimer(timer) {
  if (!timer || !timer.id || !timer.startedAt) return null
  const remaining = Number(timer.remainingMs)
  const paused = !timer.endsAt && Number.isFinite(remaining)
  if (!timer.endsAt && !paused) return null
  return {
    id: text(timer.id, 100),
    kind: timer.kind === "break" ? "break" : "focus",
    note: text(timer.note, 500),
    startedAt: text(timer.startedAt, 30),
    endsAt: paused ? null : text(timer.endsAt, 30),
    remainingMs: paused ? Math.max(0, Math.min(180 * 60_000, remaining)) : null,
    plannedMinutes: boundedMinutes(timer.plannedMinutes, 25),
    pauses: boundedCount(timer.pauses),
    pausedMs: Math.max(0, Math.min(12 * 60 * 60_000, Math.round(Number(timer.pausedMs) || 0))),
    pausedAt: paused && /^\d{4}-\d{2}-\d{2}T/.test(timer.pausedAt || "") ? text(timer.pausedAt, 30) : null,
  }
}

function normalizeSession(session) {
  if (!session || !session.id || !session.startedAt || !session.endedAt) return null
  return {
    id: text(session.id, 100),
    kind: session.kind === "break" ? "break" : "focus",
    note: text(session.note, 500),
    date: text(session.date, 10),
    startedAt: text(session.startedAt, 30),
    endedAt: text(session.endedAt, 30),
    plannedMinutes: boundedMinutes(session.plannedMinutes, 25),
    actualMinutes: boundedCount(session.actualMinutes, 1),
    pauses: boundedCount(session.pauses),
    pauseMinutes: boundedCount(session.pauseMinutes),
  }
}

function pack(store) {
  return {
    v: 1,
    s: store.startedAt,
    a: store.areas.map((area) => [area.id, area.title, area.vision, area.notes]),
    l: store.loops.map((loop) => [
      loop.id,
      loop.title,
      loop.areaId,
      loop.time,
      loop.createdAt,
      loop.archived ? 1 : 0,
    ]),
    t: store.tasks.map((task) => [
      task.id,
      task.title,
      task.areaId,
      task.dueDate,
      task.createdAt,
      task.doneAt,
      task.notes,
    ]),
    d: Object.entries(store.days).map(([date, value]) => [
      date,
      value.journal,
      value.events.map((event) => [
        event.id,
        event.type === "task" ? 1 : 0,
        event.refId,
        event.title,
        event.at,
        event.notes,
      ]),
    ]),
    f: [store.timerSettings.focusMinutes, store.timerSettings.breakMinutes, store.timerSettings.alert],
    x: store.activeTimer
      ? [
          store.activeTimer.id,
          store.activeTimer.kind,
          store.activeTimer.note,
          store.activeTimer.startedAt,
          store.activeTimer.endsAt,
          store.activeTimer.plannedMinutes,
          store.activeTimer.remainingMs,
          store.activeTimer.pauses,
          store.activeTimer.pausedMs,
          store.activeTimer.pausedAt,
        ]
      : null,
    p: store.sessions.map((session) => [
      session.id,
      session.kind,
      session.note,
      session.date,
      session.startedAt,
      session.endedAt,
      session.plannedMinutes,
      session.actualMinutes,
      session.pauses,
      session.pauseMinutes,
    ]),
    c: [
      store.companion.name,
      store.companion.bond,
      store.companion.lastSeenAt,
      store.companion.lastLine,
    ],
    /* `store.notes` stays in ordinary JSON backups and is left out of compact URLs. */
  }
}

function unpack(value) {
  return {
    version: value.v,
    startedAt: value.s,
    areas: value.a.map(([id, title, vision, notes]) => ({ id, title, vision, notes })),
    loops: value.l.map(([id, title, areaId, time, createdAt, archived]) => ({
      id,
      title,
      areaId,
      time,
      createdAt,
      archived: Boolean(archived),
    })),
    tasks: value.t.map(([id, title, areaId, dueDate, createdAt, doneAt, notes]) => ({
      id,
      title,
      areaId,
      dueDate,
      createdAt,
      doneAt,
      notes,
    })),
    days: Object.fromEntries(
      value.d.map(([date, journal, events]) => [
        date,
        {
          journal,
          events: events.map(([id, task, refId, title, at, notes]) => ({
            id,
            type: task ? "task" : "loop",
            refId,
            title,
            at,
            notes,
          })),
        },
      ]),
    ),
    timerSettings: {
      focusMinutes: value.f?.[0],
      breakMinutes: value.f?.[1],
      alert: value.f?.[2],
    },
    activeTimer: value.x
      ? {
          id: value.x[0],
          kind: value.x[1],
          note: value.x[2],
          startedAt: value.x[3],
          endsAt: value.x[4],
          plannedMinutes: value.x[5],
          remainingMs: value.x[6],
          pauses: value.x[7],
          pausedMs: value.x[8],
          pausedAt: value.x[9],
        }
      : null,
    sessions: (value.p || []).map(
      ([id, kind, note, date, startedAt, endedAt, plannedMinutes, actualMinutes, pauses, pauseMinutes]) => ({
        id,
        kind,
        note,
        date,
        startedAt,
        endedAt,
        plannedMinutes,
        actualMinutes,
        pauses,
        pauseMinutes,
      }),
    ),
    companion: {
      name: value.c?.[0],
      bond: value.c?.[1],
      lastSeenAt: value.c?.[2],
      lastLine: value.c?.[3],
    },
  }
}

function base64Url(bytes) {
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "")
}

function fromBase64Url(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/")
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4))
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

async function transform(bytes, Stream) {
  const stream = new Blob([bytes]).stream().pipeThrough(new Stream("deflate-raw"))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

export async function compactStore(store) {
  const bytes = new TextEncoder().encode(JSON.stringify(pack(normalizeStore(store))))
  return base64Url(await transform(bytes, CompressionStream))
}

export async function restoreCompactStore(payload) {
  try {
    const bytes = await transform(fromBase64Url(payload), DecompressionStream)
    return normalizeStore(unpack(JSON.parse(new TextDecoder().decode(bytes))))
  } catch {
    throw new Error("The transfer URL is invalid or incomplete")
  }
}
