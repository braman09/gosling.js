import { GeminiTrackModel } from '../../core/gemini-track-model';
import { IsChannelDeep } from '../../core/gemini.schema';
import { SUPPORTED_CHANNELS } from '../mark';

// TODO: this could be based on the spec (e.g., shareX: [track1, track2, ...])
// TODO: we do not consider sharing `genomic` scales yet
// TODO: we consider data-driven values and not constant values yet (e.g., color: { value: 'red' })
/**
 * Use a shared scale (i.e., `domain`) across multiple gemini tracks.
 */
export function shareScaleAcrossTracks(trackModels: GeminiTrackModel[], force?: boolean) {
    // we update the spec with a global domain
    const globalDomain: { [k: string]: number[] | string[] } = {};
    const channelKeys = SUPPORTED_CHANNELS;

    // generate global domains
    trackModels.forEach(model => {
        channelKeys.forEach(channelKey => {
            const channel = model.spec()[channelKey];
            if (!IsChannelDeep(channel) || channel.domain === undefined) {
                return;
            }

            const { domain, type } = channel;

            if (type === 'quantitative') {
                const numericDomain: number[] = Array.from(domain as number[]);
                if (!globalDomain[channelKey]) {
                    globalDomain[channelKey] = numericDomain;
                } else {
                    if (globalDomain[channelKey][0] > numericDomain[0]) {
                        // min
                        globalDomain[channelKey][0] = numericDomain[0];
                    }
                    if (globalDomain[channelKey][1] < numericDomain[1]) {
                        // max
                        globalDomain[channelKey][1] = numericDomain[1];
                    }
                }
            } else if (type === 'nominal') {
                const nominalDomain: string[] = Array.from(domain as string[]);
                if (!globalDomain[channelKey]) {
                    globalDomain[channelKey] = nominalDomain;
                } else {
                    globalDomain[channelKey] = Array.from(
                        new Set([...globalDomain[channelKey], ...nominalDomain])
                    ) as string[];
                }
            }
        });
    });

    // replace the domain and update scales
    trackModels.forEach(model => {
        channelKeys.forEach(channelKey => {
            model.setChannelDomain(channelKey, globalDomain[channelKey], force);
            model.setChannelScalesBasedOnCompleteSpec();
        });
    });
}