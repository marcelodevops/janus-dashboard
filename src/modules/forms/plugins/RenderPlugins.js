import React, { Component } from 'react';
import PropTypes from 'prop-types';

import block from '../../../helpers/bem-cn';
import { typeOf } from '../../../helpers';

import PluginSection from '../../PluginSection/PluginSection';
import SelectPlugin from '../../selects/SelectPlugin/SelectPlugin';
import Row from '../../Layout/Row/Row';
import Button from '../../buttons/Button';

import CorsPlugin from './Cors/CorsPlugin';
import RateLimitPlugin from './RateLimit/RateLimitPlugin';
import AuthPlugin from './oAuth/AuthPlugin';
import CompressionPlugin from './Compression/CompressionPlugin';
import RequestTransformerPlugin from './RequestTransformer/RequestTransformerPlugin';

import Section from '../../Layout/Section/Section';
import FormField from '../FormField';
import FormLabel from '../FormLabel';
import FormInput from '../FormInput/FormInput';

const propTypes = {
    className: PropTypes.string,
    plugins: PropTypes.arrayOf(PropTypes.object.isRequired),
    handlePluginExclude: PropTypes.func.isRequired,
    handlePluginInclude: PropTypes.func.isRequired,
    selectedPlugins: PropTypes.arrayOf(PropTypes.string).isRequired,
};

class RenderPlugin extends Component {
    state = {
        visiblePlugins: false,
    }

    showPlugins = () => {
        this.setState({ visiblePlugins: true });
    }

    getPluginIndex = (plugins, pluginName) => {
        const pluginIndex = plugins.findIndex(plugin => {
            return plugin.name === pluginName;
        });

        return pluginIndex;
    }

    render() {
        const { className, plugins, selectedPlugins, handlePluginExclude, handlePluginInclude, initialValues } = this.props;
        const b = block(className);
        const names = plugins.map(plugin => ({
            label: plugin.name,
            value: plugin.name,
        }));
        console.warn('INITIAL', initialValues);

        return (
            <div>
                {
                    selectedPlugins.map(pluginName => {
                        const opts = {
                            className: b(),
                            key: pluginName,
                            name: `plugins[${this.getPluginIndex(plugins, pluginName)}]`,
                            handlePluginExclude,
                            plugin: initialValues.plugins[this.getPluginIndex(plugins, pluginName)],
                            pluginName,
                        };

                        switch (pluginName) {
                            case 'cors':
                                return (
                                    <CorsPlugin
                                        {...opts}
                                    />
                                );
                            case 'rate_limit':
                                return (
                                    <RateLimitPlugin
                                        {...opts}
                                    />
                                );
                            case 'oauth2':
                                return (
                                    <AuthPlugin
                                        {...opts}
                                    />
                                );
                            case 'compression':
                                return (
                                    <CompressionPlugin
                                        {...opts}
                                    />
                                );
                            case 'request_transformer':
                                return (
                                    <RequestTransformerPlugin
                                        {...opts}
                                    />
                                );
                        }
                    })
                }

                {
                    this.state.visiblePlugins &&
                        <Row className={b('row')()}>
                            <SelectPlugin
                                name="form-field-name"
                                options={names}
                                onChange={handlePluginInclude}
                            />
                        </Row>
                }

                <Row className={b('row')()}>
                    <Button
                        type="button"
                        mod="primary"
                        onClick={this.showPlugins}
                    >
                        + Add Plugin
                    </Button>
                </Row>

                {/*<PluginOAuth />*/}
                {/*<div>
                    {
                        plugins.map((plugin, index) => {
                            if (plugin.name === 'oauth2' && plugin.enabled) {
                                return 'oAuth';
                            }
                        })
                    }
                </div>*/}

                {/*
                    plugins.map((plugin, index) => (
                        <PluginSection key={plugin.name} name={plugin.name}>
                            <FormInput component="input" label="Enabled" attachTo={`plugins[${index}].enabled`} type="checkbox" normalize={v => !!v} />
                            <FormField>
                                {
                                plugin.config && Object.keys(plugin.config).map((item) => {
                                    const config = plugins[index].config[item];

                                    if (typeOf(config, 'Object')) {
                                        return (
                                            <FormField key={item}>
                                                <FormLabel text={item} />
                                                {
                                                    Object.keys(config).map((el) => {
                                                        if (typeOf(config[el], 'Object')) {
                                                            return (
                                                                <FormField key={item}>
                                                                    <FormLabel text={item} />
                                                                    {
                                                                        Object.keys(config[el]).map(e => (
                                                                            <FormInput key={e} component="input" label={e} attachTo={`plugins[${index}].config[${item}][${el}][${e}]`} type="text" />
                                                                        ))
                                                                    }
                                                                </FormField>
                                                            );
                                                        }

                                                        return (
                                                            <FormInput key={el} component="input" label={el} attachTo={`plugins[${index}].config[${item}][${el}]`} type="text" />
                                                        );
                                                    })
                                                }
                                            </FormField>
                                        );
                                    }

                                    return (
                                        <FormInput key={item} component="input" label={item} attachTo={`plugins[${index}].config[${item}]`} type="text" />
                                    );
                                })
                            }
                            </FormField>
                        </PluginSection>
                    ))
                */}
            </div>
        );
    };
};

RenderPlugin.propTypes = propTypes;

export default RenderPlugin;
