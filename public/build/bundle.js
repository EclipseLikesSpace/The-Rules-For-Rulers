
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.3' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    class KeyClass {
        constructor(loyalty=100,defected=false,enabled=true,element_id){
            if (loyalty < 100) { loyalty = 100; }
            if (loyalty > 0) { loyalty = 0; defected=true; }
            if (typeof(loyalty) !== 'number') { loyalty = null; }
            if (typeof(defected) !== 'boolean') { defected = null; }
            this.loyalty = loyalty;
            this.defected = defected;
            this.element_id = element_id;
        }

        update() {
            if (!enabled) { return; }
            if (loyalty < 100) { loyalty = 100; }
            if (loyalty > 0) { loyalty = 0; defected=true; enabled=false; }
            if (this.defected) {
                const element = document.getElementById(this.element_id);
                element.style.backgroundColor = rgb(25,25,25);
                element.getElementById("defected").style.display = "inline";
            }
        }
    }

    /* src\components\Key.svelte generated by Svelte v3.46.3 */
    const file$1 = "src\\components\\Key.svelte";

    function create_fragment$1(ctx) {
    	let span;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let h3;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let h4;
    	let em;
    	let t6;
    	let t7;
    	let p0;
    	let t8;
    	let t9;
    	let p1;
    	let t10;
    	let strong;
    	let t11_value = /*keyData*/ ctx[0].loyalty + "";
    	let t11;
    	let t12;

    	const block = {
    		c: function create() {
    			span = element("span");
    			img0 = element("img");
    			t0 = space();
    			img1 = element("img");
    			t1 = space();
    			h3 = element("h3");
    			t2 = text(/*rank*/ ctx[3]);
    			t3 = space();
    			t4 = text(/*name*/ ctx[2]);
    			t5 = space();
    			h4 = element("h4");
    			em = element("em");
    			t6 = text(/*rank*/ ctx[3]);
    			t7 = space();
    			p0 = element("p");
    			t8 = text(/*description*/ ctx[5]);
    			t9 = space();
    			p1 = element("p");
    			t10 = text("Loyalty: ");
    			strong = element("strong");
    			t11 = text(t11_value);
    			t12 = text("%");
    			attr_dev(img0, "id", "defected");
    			if (!src_url_equal(img0.src, img0_src_value = "./../images/defected.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "loyalty");
    			attr_dev(img0, "class", "svelte-110qj0z");
    			add_location(img0, file$1, 13, 4, 373);
    			attr_dev(img1, "id", "logo");
    			if (!src_url_equal(img1.src, img1_src_value = /*path*/ ctx[4])) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "key_image");
    			attr_dev(img1, "class", "svelte-110qj0z");
    			add_location(img1, file$1, 14, 4, 443);
    			attr_dev(h3, "class", "svelte-110qj0z");
    			add_location(h3, file$1, 15, 4, 491);
    			attr_dev(em, "class", "svelte-110qj0z");
    			add_location(em, file$1, 16, 8, 523);
    			attr_dev(h4, "class", "svelte-110qj0z");
    			add_location(h4, file$1, 16, 4, 519);
    			attr_dev(p0, "id", "description");
    			attr_dev(p0, "class", "svelte-110qj0z");
    			add_location(p0, file$1, 17, 4, 549);
    			attr_dev(strong, "class", "svelte-110qj0z");
    			add_location(strong, file$1, 18, 32, 620);
    			attr_dev(p1, "class", "loyalty svelte-110qj0z");
    			add_location(p1, file$1, 18, 4, 592);
    			attr_dev(span, "id", /*id*/ ctx[1]);
    			attr_dev(span, "max-width", "500px");
    			attr_dev(span, "class", "key svelte-110qj0z");
    			add_location(span, file$1, 12, 0, 323);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, img0);
    			append_dev(span, t0);
    			append_dev(span, img1);
    			append_dev(span, t1);
    			append_dev(span, h3);
    			append_dev(h3, t2);
    			append_dev(h3, t3);
    			append_dev(h3, t4);
    			append_dev(span, t5);
    			append_dev(span, h4);
    			append_dev(h4, em);
    			append_dev(em, t6);
    			append_dev(span, t7);
    			append_dev(span, p0);
    			append_dev(p0, t8);
    			append_dev(span, t9);
    			append_dev(span, p1);
    			append_dev(p1, t10);
    			append_dev(p1, strong);
    			append_dev(strong, t11);
    			append_dev(p1, t12);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*path*/ 16 && !src_url_equal(img1.src, img1_src_value = /*path*/ ctx[4])) {
    				attr_dev(img1, "src", img1_src_value);
    			}

    			if (dirty & /*rank*/ 8) set_data_dev(t2, /*rank*/ ctx[3]);
    			if (dirty & /*name*/ 4) set_data_dev(t4, /*name*/ ctx[2]);
    			if (dirty & /*rank*/ 8) set_data_dev(t6, /*rank*/ ctx[3]);
    			if (dirty & /*description*/ 32) set_data_dev(t8, /*description*/ ctx[5]);
    			if (dirty & /*keyData*/ 1 && t11_value !== (t11_value = /*keyData*/ ctx[0].loyalty + "")) set_data_dev(t11, t11_value);

    			if (dirty & /*id*/ 2) {
    				attr_dev(span, "id", /*id*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Key', slots, []);
    	let { keyData = new KeyClass() } = $$props;
    	let { id = null } = $$props;
    	let { name = null } = $$props;
    	let { rank = null } = $$props;
    	let { path = null } = $$props;
    	let { description = null } = $$props;
    	let { loyalty = null } = $$props;
    	keyData.loyalty = loyalty;
    	const writable_props = ['keyData', 'id', 'name', 'rank', 'path', 'description', 'loyalty'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Key> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('keyData' in $$props) $$invalidate(0, keyData = $$props.keyData);
    		if ('id' in $$props) $$invalidate(1, id = $$props.id);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('rank' in $$props) $$invalidate(3, rank = $$props.rank);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    		if ('description' in $$props) $$invalidate(5, description = $$props.description);
    		if ('loyalty' in $$props) $$invalidate(6, loyalty = $$props.loyalty);
    	};

    	$$self.$capture_state = () => ({
    		KeyClass,
    		keyData,
    		id,
    		name,
    		rank,
    		path,
    		description,
    		loyalty
    	});

    	$$self.$inject_state = $$props => {
    		if ('keyData' in $$props) $$invalidate(0, keyData = $$props.keyData);
    		if ('id' in $$props) $$invalidate(1, id = $$props.id);
    		if ('name' in $$props) $$invalidate(2, name = $$props.name);
    		if ('rank' in $$props) $$invalidate(3, rank = $$props.rank);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    		if ('description' in $$props) $$invalidate(5, description = $$props.description);
    		if ('loyalty' in $$props) $$invalidate(6, loyalty = $$props.loyalty);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [keyData, id, name, rank, path, description, loyalty];
    }

    class Key extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
    			keyData: 0,
    			id: 1,
    			name: 2,
    			rank: 3,
    			path: 4,
    			description: 5,
    			loyalty: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Key",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get keyData() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set keyData(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rank() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rank(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get path() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loyalty() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loyalty(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Index.svelte generated by Svelte v3.46.3 */
    const file = "src\\Index.svelte";

    function create_fragment(ctx) {
    	let t0;
    	let body;
    	let span;
    	let h1;
    	let t2;
    	let key0;
    	let t3;
    	let key1;
    	let t4;
    	let key2;
    	let t5;
    	let key3;
    	let t6;
    	let p;
    	let a;
    	let current;

    	key0 = new Key({
    			props: {
    				id: "general_ofsho",
    				name: "Ofsho",
    				rank: "General",
    				path: "./images/general.png",
    				description: "The general's purpose is to defend and protect the\r\n            country, not enforce the laws. The enforcer does that, not the army.",
    				loyalty: "78"
    			},
    			$$inline: true
    		});

    	key1 = new Key({
    			props: {
    				id: "scientist_rstar",
    				name: "RStar",
    				rank: "Scientist",
    				path: "./images/scientist.png",
    				description: "The scientist is to research technology and weaponry for\r\n            you, your general and your army.",
    				loyalty: "92"
    			},
    			$$inline: true
    		});

    	key2 = new Key({
    			props: {
    				id: "king_you",
    				name: "You",
    				rank: "King",
    				path: "./images/you.png",
    				description: "This is you. That's it. You are the king. You are the leader, got that?",
    				loyalty: "Infinity"
    			},
    			$$inline: true
    		});

    	key3 = new Key({
    			props: {
    				id: "enforcer_eclipse",
    				name: "Codename Eclipse",
    				rank: "Enforcer",
    				path: "./images/enforcer.png",
    				description: "The Enforcer enforces the law. The Enforcer is one of the most important keys in the game. Without the Enforcer, your country will fall into chaos.",
    				loyalty: "0"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			t0 = space();
    			body = element("body");
    			span = element("span");
    			h1 = element("h1");
    			h1.textContent = "Keys";
    			t2 = space();
    			create_component(key0.$$.fragment);
    			t3 = space();
    			create_component(key1.$$.fragment);
    			t4 = space();
    			create_component(key2.$$.fragment);
    			t5 = space();
    			create_component(key3.$$.fragment);
    			t6 = space();
    			p = element("p");
    			a = element("a");
    			a.textContent = "Contribute on Github!";
    			document.title = "The Rules for Rulers";
    			attr_dev(h1, "class", "center svelte-3t6x1c");
    			add_location(h1, file, 10, 8, 261);
    			attr_dev(span, "id", "key-container");
    			set_style(span, "border", "2px solid #aaa");
    			set_style(span, "display", "inline-block");
    			set_style(span, "width", "75rem");
    			attr_dev(span, "class", "svelte-3t6x1c");
    			add_location(span, file, 9, 4, 157);
    			attr_dev(a, "id", "github");
    			attr_dev(a, "href", "https://github.com/EclipseLikesSpace/The-Rules-For-Rulers");
    			attr_dev(a, "class", "svelte-3t6x1c");
    			add_location(a, file, 46, 8, 1599);
    			attr_dev(p, "class", "svelte-3t6x1c");
    			add_location(p, file, 46, 4, 1595);
    			attr_dev(body, "class", "svelte-3t6x1c");
    			add_location(body, file, 8, 0, 145);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, body, anchor);
    			append_dev(body, span);
    			append_dev(span, h1);
    			append_dev(span, t2);
    			mount_component(key0, span, null);
    			append_dev(span, t3);
    			mount_component(key1, span, null);
    			append_dev(span, t4);
    			mount_component(key2, span, null);
    			append_dev(span, t5);
    			mount_component(key3, span, null);
    			append_dev(body, t6);
    			append_dev(body, p);
    			append_dev(p, a);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key0.$$.fragment, local);
    			transition_in(key1.$$.fragment, local);
    			transition_in(key2.$$.fragment, local);
    			transition_in(key3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key0.$$.fragment, local);
    			transition_out(key1.$$.fragment, local);
    			transition_out(key2.$$.fragment, local);
    			transition_out(key3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(body);
    			destroy_component(key0);
    			destroy_component(key1);
    			destroy_component(key2);
    			destroy_component(key3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Index', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Index> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Key });
    	return [];
    }

    class Index extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Index",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new Index({
    	target: document.body,
    	props: {}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
