import { register } from '../registry';

/**
 * Makes the class instance available for injection.
 */
export function Injectable(): ClassDecorator {
    return target => register(target);
}
