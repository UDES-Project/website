from flash_flask import route, send_template

@route()
def endpoint():
	return send_template()