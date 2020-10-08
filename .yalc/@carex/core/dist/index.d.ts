// Generated by dts-bundle-generator v5.4.0

import { MonoTypeOperatorFunction, Observable } from 'rxjs';

export declare function always<T>(handler: () => void): MonoTypeOperatorFunction<T>;
export declare function sampleWith<S, C, R>(clock$: Observable<C>, handler: (source: S, clock: C) => R): (source$: Observable<S>) => Observable<R>;
export declare function filterWith<T, F>(filter$: Observable<F>, predicate?: (source: T, filter: F) => boolean): MonoTypeOperatorFunction<T>;
export declare type Handler<S, P> = (state: S, payload: P) => S;
export declare type ErrorHandler = (error: any) => void;
export interface Store<State> {
	on: <Payload>(events$: Observable<Payload> | Observable<Payload>[], handler: Handler<State, Payload>) => Store<State>;
	off: <Payload>(events$: Observable<Payload> | Observable<Payload>[]) => Store<State>;
	reset: (events$: Observable<any> | Observable<any>[]) => Store<State>;
	setErrorHandler: (handler: ErrorHandler) => Store<State>;
}
export declare type Trigger<T> = (value: T) => void;
export interface Event<Payload> {
	trigger: Trigger<Payload>;
	getName: () => string;
}
export declare enum Strategy {
	Merge = "merge",
	Concat = "concat",
	Switch = "switch",
	Exhaust = "exhaust"
}
export declare type EffectHandler<Params, Result> = (params: Params) => Promise<Result> | Observable<Result>;
export declare class ObservableEvent<Payload = void> extends Observable<Payload> implements Event<Payload> {
	private name;
	private readonly subject$;
	constructor(name?: string);
	getName(): string;
	trigger: (payload: Payload) => void;
}
export declare class ObservableEffect<Params, Result, Err = Error> extends ObservableEvent<Params> {
	private handler;
	static defaultStrategy: Strategy;
	static defaultHandler: typeof errorHandler;
	private mapper;
	private resultSubject$;
	private errorSubject$;
	private finallySubject$;
	private activeEffectsStore$;
	private activeEffectsApi;
	private cancelEvent$;
	private strategy;
	private subscription;
	result$: import("rxjs").Observable<Result>;
	error$: import("rxjs").Observable<Err>;
	finally$: import("rxjs").Observable<Params>;
	activeEffects$: import("rxjs").Observable<number>;
	pending$: import("rxjs").Observable<boolean>;
	constructor(handler?: EffectHandler<Params, Result>);
	private createSubscription;
	setStrategy(strategy: Strategy): void;
	getHandler(): EffectHandler<Params, Result>;
	setHandler(handler: EffectHandler<Params, Result>): void;
	get cancel(): (payload: void) => void;
}
declare function errorHandler(): import("rxjs").Observable<never>;
export declare class ObservableStore<State> extends Observable<State> implements Store<State> {
	private initialValue;
	private readonly subject$;
	private readonly subscriptions;
	private readonly resetSubscriptions;
	private errorHandler;
	constructor(initialValue: State);
	get asObservable(): () => Observable<State>;
	on<Payload>(events$: Observable<Payload> | Observable<Payload>[], handler: Handler<State, Payload>): this;
	off<Payload>(events$: Observable<Payload> | Observable<Payload>[]): this;
	reset(events$: Observable<any> | Observable<any>[]): this;
	setErrorHandler(handler: ErrorHandler): this;
}
export declare function createApi<S, Api extends {
	[name: string]: (store: S, e: any) => S;
}>(store$: ObservableStore<S>, api: Api): {
	[K in keyof Api]: Api[K] extends (store: S, e: void) => S ? Trigger<void> : Api[K] extends (store: S, e: infer E) => S ? Trigger<E extends void ? Exclude<E, undefined> | void : E> : any;
};
export declare function restore<T>(event$: Observable<T>, defaultValue: T): ObservableStore<T>;

export {};
