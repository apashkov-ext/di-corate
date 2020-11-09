import { register } from '../registry'

/**
 * Makes the class instance available for injection.
 */
export default function Injectable(): ClassDecorator {
    return target => register(target);
}
