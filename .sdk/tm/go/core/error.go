package core

type WhoisDomainMonitoringError struct {
	IsWhoisDomainMonitoringError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWhoisDomainMonitoringError(code string, msg string, ctx *Context) *WhoisDomainMonitoringError {
	return &WhoisDomainMonitoringError{
		IsWhoisDomainMonitoringError: true,
		Sdk:              "WhoisDomainMonitoring",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WhoisDomainMonitoringError) Error() string {
	return e.Msg
}
