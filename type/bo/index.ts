
export type SessionInfo = {
  id: string
  created_at: number
  updated_at: number
  session_id: string
  titel: string
  status: number
  chatroom_id: string
  start_time: number
  end_time: number
}

export type ChatMessage = {
  id: string
  username: string
  message: string
  time: string
}
