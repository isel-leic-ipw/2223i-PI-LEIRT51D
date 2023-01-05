

const SESSION_COOKIE = "_session_"

import crypto from 'crypto'

const SESSIONS = []

export default function() {
    return function(req, rsp, next) {
        const sessionId = req.cookies[SESSION_COOKIE]
        let session = getSession(sessionId)
        if(sessionId != session.id)
            rsp.cookie(SESSION_COOKIE, session.id)
        req.session = session.data
        next()
    }
}


function getSession(sessionId) {
    let session = SESSIONS.find(s => s.id == sessionId)
    if(session)
        return session
    session = {
        id: crypto.randomUUID(),
        data: { }
    }
    SESSIONS.push(session)
    return session
}
