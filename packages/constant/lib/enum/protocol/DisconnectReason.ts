export enum DisconnectReason {
	ExitGame,
	GameFull,
	GameStarted,
	GameNotFound,
	IncorrectVersion = 5,
	Banned,
	Kicked,
	Custom,
	InvalidName,
	Hacking,
	NotAuthorized,
	Destroy = 16,
	Error,
	IncorrectGame,
	ServerRequest,
	ServerFull,
	InternalPlayerMissing = 100,
	InternalNonceFailure,
	InternalConnectionToken,
	PlatformLock,
	LobbyInactivity,
	MatchmakerInactivity,
	InvalidGameOptions,
	NoServersAvailable,
	QuickmatchDisabled,
	TooManyGames,
	QuickchatLock,
	MatchmakerFull,
	Sanctions,
	ServerError,
	SelfPlatformLock,
	IntentionalLeaving = 208,
	FocusLostBackground = 207,
	FocusLost = 209,
	NewConnection,
	PlatformParentalControlsBlock,
	PlatformUserBlock
}
