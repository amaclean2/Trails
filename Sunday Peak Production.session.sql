-- SELECT ci.conversation_id, c.last_message, c.conversation_name
-- FROM conversation_interactions AS ci
-- INNER JOIN conversations AS c ON c.id = ci.conversation_id
-- WHERE ci.user_id IN (11, 1)
-- GROUP BY ci.conversation_id
-- HAVING COUNT(ci.conversation_id) > 1

SELECT ci.conversation_id c.last_message, c.conversation_name FROM conversation_interactions AS ci
INNER JOIN conversations AS c ON c.id = ci.conversation_id
WHERE conversation_id IN (SELECT conversation_id FROM conversation_interactions WHERE user_id IN (3, 1))
AND conversation_id NOT IN (SELECT conversation_id FROM conversation_interactions WHERE user_id NOT IN (3, 1))
GROUP BY conversation_id