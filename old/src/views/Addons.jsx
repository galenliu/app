import React, {useCallback, useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import {makeStyles} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import Slide from '@mui/material/Slide';
import API from "../js/api";
import ExtensionIcon from '@mui/icons-material/Extension';
import ErrorIcon from '@mui/icons-material/Error';
import Card from "@mui/material/Card";
import {AddonIcons} from "../component/icons";
import {Button, CircularProgress, FormHelperText, Link} from "@mui/material";
import Divider from "@mui/material/Divider";
import StoreIcon from '@mui/icons-material/Store';
import {versionStringCompare} from "../utils";
import AddIcon from '@mui/icons-material/Add';

// Make modifications to the theme with your own fields and widgets

export const useStyles = makeStyles((theme) => ({
  root: {},
  addonCard: {
    padding: 3,
    display: "flex",
    maxWidth: 400,
    minWidth: 240,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  configCard: {
    padding: 5,
    maxWidth: 600,
    minWidth: 600,
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "flex-end",

  },
  configForm: {},
  cardContent: {
    display: "flex",
    minWidth: 200,
    maxWidth: 200,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sideContent: {
    display: "flex",
    flexDirection: "column",
    direction: "column",
    minWidth: 80,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  content: {

    justifyContent: "flex-start", alignItems: "center", direction: "column",

  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  appBar: {},
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const states = {
  Loading: "loading",
  Empty: "empty",
  Completed: "completed",
}

export default function AddonsDialog(props) {

  const classes = useStyles();
  const {t} = useTranslation();
  const [fetchAddonsShow, setFetchAddonsShow] = useState(false)
  const [addonConfigShow, setAddonConfigShow] = useState(false)

  const [installedAddons, setInstalledAddons] = useState(new Map())
  const [availableAddons, setAvailableAddons] = useState(new Map())
  const [state, setState] = useState(states.Loading)
  const [configAddon, setConfigAddon] = useState({})


  function fetchAvailableAddonList() {
    return new Promise(function (resolve, reject) {
      return API.getAddonsInfo().then((data) => {
        console.log(data)
        if (!data.nodeVersion || !data.version || !data.architecture || !data.urls || !data) {
          return;
        }
        const params = new URLSearchParams();
        params.set('arch', data.architecture);
        params.set('version', data.version);
        params.set('node', data.nodeVersion);
        console.log(data)
        if (data.pythonVersions && data.pythonVersions.length > 0) {
          params.set('python', data.pythonVersions.join(','));
        }
        if (data.testAddons) {
          params.set('test', '1');
        }
        const promises = [];
        for (const url of data.urls) {
          console.log(url)
          promises.push(fetch(`${url}?${params.toString()}`, {
            method: 'GET',
            cache: 'reload',
            headers: {
              Accept: 'application/json',
            },
          }));
        }
        return Promise.all(promises)
      }).then(
        (responses) => {
          const promises = []
          console.log(responses, "responses.....")
          for (const resp of responses) {
            promises.push(resp.json())
          }
          return Promise.all(promises)
        }).then((bodies) => {
          let availableAddons = new Map()
          for (const body of bodies) {
            if (!body) {
              continue
            }
            for (const addon of body) {
              const entry = {
                id: addon.id,
                name: addon.name,
                description: addon.description,
                author: addon.author,
                homepage_url: addon.homepage_url,
                license_url: addon.license_url,
                version: addon.version,
                url: addon.url,
                checksum: addon.checksum,
                primary_type: addon.primary_type,
                installed: installedAddons.has(addon.id),
              }

              if (installedAddons.has(addon.id)) {
                continue;
              }
              availableAddons.set(addon.id, entry)

            }
          }
          resolve(availableAddons);
        }
      ).catch((e) => {
        reject(e)
      })

    }).catch((e) => {
      console.error(e)
    })


  }

  function fetchInstalledAddonsList() {
    return new Promise(function (resolve, reject) {
      API.getInstalledAddons().then(body => {
        if (body === null) {
          setInstalledAddons(new Map())
          return reject(new Error("installed empty"))
        }
        console.log("fetch the installed addon body :", body)
        let newMap = new Map()
        try {
          for (const s of body) {
            s.isUpdate = false
            newMap.set(s.id, s)
          }

        } catch (err) {
          return reject(err);
        }
        return resolve(newMap)
      }).catch((err) => {
        return reject(err);
      })
    })
  }

  function handleConfigAddon(addon) {
    setConfigAddon(addon)
    setAddonConfigShow(true)
  }

  function renderInstalledAddonsList() {
    console.log("installedAddons:", installedAddons)
    const list = []
    for (const [id, a] of installedAddons) {
      console.log("installedAddons:", id, a)
      const addon = <InstalledAddon key={a.id}  {...a}
                                    config={handleConfigAddon}
      />
      list.push(addon)
    }
    return list
  }

  const load = useCallback(() => {
    try {
      fetchInstalledAddonsList().then((installedAddons) => {
        setInstalledAddons(installedAddons)
        setState(states.Completed)
        return fetchAvailableAddonList()
      }).catch((e) => {
        setState(states.Completed)
        console.log(e)
        return fetchAvailableAddonList()
      }).then((fetchAddons) => {
        const installed = installedAddons
        for (const [id, addon] of fetchAddons) {
          if (installed !== null) {
            if (installed.has(id)) {
              if (!addon.installed) {
                fetchAddons.get(id).installed = true
              }
              if (versionStringCompare(addon.version, installed.get(id).version) > 0) {
                console.log(versionStringCompare(addon.version, installed.get(id).version))
                installed.get(id).isUpdate = true
                installed.get(id).url = addon.url
              }
            }
          }
        }
        if (installed.size !== 0) {
          setInstalledAddons(installed)
        }
        if (fetchAddons.size !== 0) {
          setAvailableAddons(fetchAddons)
        }
      }).catch((e) => {
        console.log(e)
      })


    } catch (err) {
      console.log(err)
    }
  }, [])

  //首先获取已安装的 addon
  useEffect(() => {
    if (!props.open) {
      setFetchAddonsShow(false)
      setAddonConfigShow(false)
    } else {
      setState(states.Loading)
      load()
    }
  }, [props.open])


  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={() => props.show(false)}
              TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <ExtensionIcon/>
            <Typography variant="h6" className={classes.title}>
              {t("Installed Addons")}
            </Typography>
            <IconButton autoFocus color="inherit" onClick={() => props.show(false)}
                        aria-label="close">
              <CloseIcon/>
            </IconButton>
            <IconButton autoFocus color="inherit" aria-label="close" onClick={() => {
              setFetchAddonsShow(true)
            }}>
              <AddIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Grid className={classes.content} container justify="flex-start" alignItems="center"
              direction="column">
          <div className={classes.drawerHeader}/>
          {state === states.Loading && <CircularProgress disableShrink/>}
          {renderInstalledAddonsList()}
          {state === states.Completed && installedAddons.size === 0 &&
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><AddIcon
            cursor={"pointer"}
            onClick={() => setFetchAddonsShow(true)} style={{fontSize: 50}}/><Typography variant="h6"
                                                                                         className={classes.title}>
            {t("Click Added")}
          </Typography></div>}

        </Grid>
      </Dialog>
      <FetchAddonsDialog installedAddons={installedAddons} availableAddons={availableAddons}
                         reload={load} open={fetchAddonsShow} show={setFetchAddonsShow}/>

      <AddonConfigDialog open={addonConfigShow} show={setAddonConfigShow} {...configAddon}/>
    </div>
  )

}

function FetchAddonsDialog(props) {

  const classes = useStyles();
  const {t} = useTranslation();

  const availableAddons = props.availableAddons

  function renderAvailableAddons() {
    if (!availableAddons) {
      return
    }
    const list = []
    for (const [id, addon] of availableAddons) {
      if (availableAddons.has(id)) {
        const a = <NewAddon key={addon.id}  {...addon}

        />
        list.push(a)
      }

    }
    return list
  }


  return (
    <Dialog fullScreen className={classes.root} open={props.open} onClose={() => {
      props.show(false);
      props.reload()
    }}
            TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <StoreIcon/>
          <Typography variant="h6" className={classes.title}>
            {t("AddonsMarket")}
          </Typography>
          <IconButton autoFocus color="inherit" onClick={() => {
            props.show(false);
            props.reload()
          }} aria-label="close">
            <CloseIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.drawerHeader}/>
      <Grid className={classes.content} container justify="flex-start" alignItems="center" direction="column">
        {renderAvailableAddons()}
      </Grid>
    </Dialog>
  )

}

function AddonConfigDialog(props) {

  const classes = useStyles();
  const {t} = useTranslation();
  const [config, setConfig] = useState({})

  function fetchAddonConfig() {
    try {
      API.getAddonConfig(props.id).then((conf) => {
        setConfig(conf)
        console.log("config------", conf)
      })
    } catch (e) {
      console.log(e)
    }
  }

  function handleUpdateConfig(data) {
    API.setAddonConfig(props.id, data.formData).then((config) => {
      console.log("saved config:", config)
    }).catch((e) => {
      console.log(e)
    })
  }

  function renderConfigView() {
    if (config === null || props.schema === null) {
      return <ErrorIcon/>
    }

    return <Card elevation={20} className={classes.configCard}>
      <Form
        formData={config}
        onSubmit={handleUpdateConfig}
        className={classes.configForm}
        schema={props.schema}/></Card>


  }

  useEffect(() => {
    renderConfigView()
  }, [config])


  useEffect(() => {
    if (props.open) {
      fetchAddonConfig()
    }
  }, [props.open])

  return (
    <Dialog fullScreen className={classes.root} open={props.open} onClose={() => {
      props.show(false);
    }}
            TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <ExtensionIcon/>
          <Typography variant="h5" className={classes.title}>{t("Add-on Configure")}
          </Typography>
          <IconButton autoFocus color="inherit" onClick={() => {
            props.show(false);
          }} aria-label="close">
            <CloseIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.drawerHeader}/>
      <Grid className={classes.content} container justify="flex-start" alignItems="center" direction="column">
        {renderConfigView()}
      </Grid>
    </Dialog>
  )
}

function InstalledAddon(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  return (
    <>
      <Card className={classes.addonCard} elevation={5}>
        <Addon {...props}/>
        <div className={classes.sideContent}>
          {!props.enabled && <Button style={{margin: 3}}
                                     variant="contained"
                                     color="primary">
            {t("enable")}
          </Button>}

          {props.enabled && <Button style={{margin: 3}}
                                    variant="contained"
                                    color="primary">
            {t("disable")}
          </Button>}

          {props.isUpdate && <Button style={{margin: 3}}
                                     variant="contained"
                                     color="primary">
            {t("update")}
          </Button>}

          <Button onClick={() => props.config(props)} style={{margin: 3}}
                  variant="contained"
                  color="primary">
            {t("configure")}
          </Button>
        </div>
      </Card>
      <Divider/>
    </>
  )

}

function NewAddon(props) {

  const classes = useStyles();
  const {t} = useTranslation();


  const states = {
    install: "install",
    installed: "installed",
    pending: "pending",
    failed: "failed",
  }
  const [state, setState] = useState()

  useEffect(() => {
    if (props.installed) {
      setState(states.installed)
    } else {
      setState(states.install)
    }
  }, [])


  const handleInstallAddon = () => {
    setState(states.pending)
    console.log("install args:", props.id, props.url, props.checksum)
    API.installAddon(props.id, props.url, props.checksum).then((req) => {
      console.log("install addon OK", req)
      setState(states.installed)
    }).catch((e) => {
      setState(states.failed)
      console.error(e)
    })
  }


  return (
    <>
      <Card className={classes.addonCard} elevation={10}>
        <Addon {...props} />
        <div className={classes.sideContent}>
          {state === states.install && <Button
            onClick={() => {
              handleInstallAddon()
            }}
            variant="contained"
            color="primary">
            {t("install")}
          </Button>
          }
          {state === states.installed && <Button
            variant="contained"
            disabled={true}
            color="primary">
            {t("installed")}
          </Button>
          }
          {state === states.pending && <CircularProgress/>}
          {
            state === states.failed && <Button color="secondary" disabled={true} className={classes.button}>
              <Typography gutterBottom color="secondary">
                {t(states.failed)}
              </Typography></Button>}
        </div>
      </Card>
      <Divider/>
    </>
  )

}

function Addon(props) {
  const classes = useStyles();
  const {t} = useTranslation();
  return <>
    <AddonIcons style={{fontSize: 80}} color={"primary"} type={props.primary_type}/>
    <div className={classes.cardContent}>
      <FormHelperText>{t("name")}: </FormHelperText>
      <Typography variant="h5">
        {props.name}
      </Typography>
      <FormHelperText>{t("id")}: </FormHelperText>
      <Typography variant="subtitle1">
        {props.id}
      </Typography>
      <div style={{
        display: "flex",
        "flexDirection": "row",
        "justifyContent": "flex-start",
        "alignItems": "center"
      }}>
        <FormHelperText>{t("version")}: </FormHelperText>
        <Typography variant="body1">
          {props.version}
        </Typography>
      </div>
      <div style={{
        display: "flex",
        "flexDirection": "row",
        "justifyContent": "flex-start",
        "alignItems": "center"
      }}>
        <FormHelperText>{t("author")}: </FormHelperText>

        <Link href={props.homepage_url}>
          {props.author}
        </Link>
      </div>
      <div style={{display: "flex", "flexDirection": "row"}}>
        <Link href={props.license_url}>
          {t("license")}
        </Link>
      </div>
    </div>
  </>
}


