; extends

; These are all interpreted as regex when evaluated
; https://github.com/ranger/ranger/blob/38bb8901004b75a407ffee4b9e176bc0a436cb15/ranger/ext/rifle.py#L273-L282
(binary_condition_expression
  (binary_condition_identifier) @rc_keyword
  (identifier) @injection.content
  (#any-of? @rc_keyword "match" "ext" "mime" "name" "path" "has" "env" "label")
  (#set! injection.language "regex"))
