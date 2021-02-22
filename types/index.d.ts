import _Vue from 'vue';

import './vue';

export type MessageFormatter<T> = (event: MessageEvent) => T;

export type MessageHandler = (data: any) => void;

export interface SSEConfig {
	format?: 'plain' | 'json' | MessageFormatter<any>;
	handlers?: Partial<Record<string, MessageHandler>>;
	polyfill?: boolean;
	url?: string;
	withCredentials?: boolean;
}

export declare class SSEManager {
	$defaultConfig: SSEConfig;

	constructor(config?: SSEConfig);
	create(config?: SSEConfig): SSEClient;
}

export declare class SSEClient {
	url: string;
	withCredentials: boolean;

	_format: MessageFormatter<any>;
	_handlers: Partial<Record<string, MessageHandler[]>>;
	_listeners: Partial<Record<string, EventListener>>;
	_source: EventSource;

	constructor(config?: SSEConfig);
	connect(): Promise<SSEClient>;
	disconnect(): void;
	on(event: string, handler: MessageHandler): void;
	once(event: string, handler: MessageHandler): void;
	off(event: string, handler: MessageHandler): void;

	get source(): EventSource;
}

export declare function install(Vue: typeof _Vue, config?: SSEConfig): void;

declare const _default: {
	install: typeof install;
}
export default _default;

// EventSource -> EventListener -> MessageHandler[]
